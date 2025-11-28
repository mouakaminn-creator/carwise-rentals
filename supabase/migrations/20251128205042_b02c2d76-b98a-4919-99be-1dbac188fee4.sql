-- Create enum types
CREATE TYPE public.user_role AS ENUM ('ADMIN', 'EMPLOYEE');
CREATE TYPE public.car_status AS ENUM ('AVAILABLE', 'RENTED', 'MAINTENANCE', 'UNAVAILABLE');
CREATE TYPE public.fuel_type AS ENUM ('DIESEL', 'ESSENCE', 'HYBRIDE', 'ELECTRIQUE');
CREATE TYPE public.transmission_type AS ENUM ('MANUAL', 'AUTOMATIC');
CREATE TYPE public.rental_status AS ENUM ('ACTIVE', 'COMPLETED', 'CANCELLED', 'LATE');
CREATE TYPE public.payment_status AS ENUM ('UNPAID', 'PARTIALLY_PAID', 'PAID');
CREATE TYPE public.maintenance_type AS ENUM ('VIDANGE', 'PNEUS', 'FREINS', 'AUTRE');

-- Create user_roles table (separate from profiles for security)
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role user_role NOT NULL DEFAULT 'EMPLOYEE',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, role)
);

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role user_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Create profiles table for additional user info
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create cars table
CREATE TABLE public.cars (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  brand TEXT NOT NULL,
  model TEXT NOT NULL,
  registration_number TEXT NOT NULL UNIQUE,
  year INTEGER NOT NULL,
  fuel_type fuel_type NOT NULL,
  transmission transmission_type NOT NULL,
  mileage INTEGER NOT NULL DEFAULT 0,
  daily_price DECIMAL(10,2) NOT NULL,
  status car_status NOT NULL DEFAULT 'AVAILABLE',
  insurance_expiry DATE NOT NULL,
  vignette_expiry DATE NOT NULL,
  technical_inspection_expiry DATE NOT NULL,
  last_service_km INTEGER NOT NULL DEFAULT 0,
  next_service_km INTEGER NOT NULL,
  service_interval_km INTEGER NOT NULL DEFAULT 10000,
  image_url TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create clients table
CREATE TABLE public.clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  cin TEXT NOT NULL UNIQUE,
  phone TEXT NOT NULL,
  email TEXT,
  driving_license_number TEXT,
  address TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create rentals table
CREATE TABLE public.rentals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  car_id UUID NOT NULL REFERENCES public.cars(id) ON DELETE RESTRICT,
  client_id UUID NOT NULL REFERENCES public.clients(id) ON DELETE RESTRICT,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  daily_price DECIMAL(10,2) NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  status rental_status NOT NULL DEFAULT 'ACTIVE',
  payment_status payment_status NOT NULL DEFAULT 'UNPAID',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create maintenance table
CREATE TABLE public.maintenance (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  car_id UUID NOT NULL REFERENCES public.cars(id) ON DELETE CASCADE,
  type maintenance_type NOT NULL,
  date DATE NOT NULL,
  mileage_at_service INTEGER NOT NULL,
  cost DECIMAL(10,2),
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create reservation_requests table for public website
CREATE TABLE public.reservation_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  desired_car TEXT,
  start_date DATE,
  end_date DATE,
  message TEXT,
  status TEXT NOT NULL DEFAULT 'PENDING',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cars ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rentals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.maintenance ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reservation_requests ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user_roles (only admins can manage)
CREATE POLICY "Admins can view all roles" ON public.user_roles
  FOR SELECT USING (public.has_role(auth.uid(), 'ADMIN'));

CREATE POLICY "Admins can insert roles" ON public.user_roles
  FOR INSERT WITH CHECK (public.has_role(auth.uid(), 'ADMIN'));

CREATE POLICY "Admins can update roles" ON public.user_roles
  FOR UPDATE USING (public.has_role(auth.uid(), 'ADMIN'));

CREATE POLICY "Admins can delete roles" ON public.user_roles
  FOR DELETE USING (public.has_role(auth.uid(), 'ADMIN'));

-- RLS Policies for profiles
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles" ON public.profiles
  FOR SELECT USING (public.has_role(auth.uid(), 'ADMIN'));

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- RLS Policies for cars (public can view available, staff can manage)
CREATE POLICY "Anyone can view available cars" ON public.cars
  FOR SELECT USING (status = 'AVAILABLE' OR auth.uid() IS NOT NULL);

CREATE POLICY "Staff can insert cars" ON public.cars
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Staff can update cars" ON public.cars
  FOR UPDATE USING (auth.uid() IS NOT NULL);

CREATE POLICY "Admins can delete cars" ON public.cars
  FOR DELETE USING (public.has_role(auth.uid(), 'ADMIN'));

-- RLS Policies for clients (only staff can manage)
CREATE POLICY "Staff can view all clients" ON public.clients
  FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "Staff can insert clients" ON public.clients
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Staff can update clients" ON public.clients
  FOR UPDATE USING (auth.uid() IS NOT NULL);

CREATE POLICY "Admins can delete clients" ON public.clients
  FOR DELETE USING (public.has_role(auth.uid(), 'ADMIN'));

-- RLS Policies for rentals (only staff can manage)
CREATE POLICY "Staff can view all rentals" ON public.rentals
  FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "Staff can insert rentals" ON public.rentals
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Staff can update rentals" ON public.rentals
  FOR UPDATE USING (auth.uid() IS NOT NULL);

CREATE POLICY "Admins can delete rentals" ON public.rentals
  FOR DELETE USING (public.has_role(auth.uid(), 'ADMIN'));

-- RLS Policies for maintenance (only staff can manage)
CREATE POLICY "Staff can view all maintenance" ON public.maintenance
  FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "Staff can insert maintenance" ON public.maintenance
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Staff can update maintenance" ON public.maintenance
  FOR UPDATE USING (auth.uid() IS NOT NULL);

CREATE POLICY "Admins can delete maintenance" ON public.maintenance
  FOR DELETE USING (public.has_role(auth.uid(), 'ADMIN'));

-- RLS Policies for reservation_requests (public can insert, staff can view)
CREATE POLICY "Anyone can insert reservation requests" ON public.reservation_requests
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Staff can view reservation requests" ON public.reservation_requests
  FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "Staff can update reservation requests" ON public.reservation_requests
  FOR UPDATE USING (auth.uid() IS NOT NULL);

-- Create trigger function for updating timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add update triggers to tables
CREATE TRIGGER update_user_roles_updated_at BEFORE UPDATE ON public.user_roles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_cars_updated_at BEFORE UPDATE ON public.cars
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_clients_updated_at BEFORE UPDATE ON public.clients
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_rentals_updated_at BEFORE UPDATE ON public.rentals
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_maintenance_updated_at BEFORE UPDATE ON public.maintenance
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, name, email)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', 'User'),
    NEW.email
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Trigger to create profile on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();