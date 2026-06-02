import {createFileRoute, Link} from '@tanstack/react-router';
import {motion} from 'framer-motion';
import {
  Search,
  MapPin,
  Calendar,
  Users,
  Star,
  ChevronRight,
  Globe,
  ShieldCheck,
  HeadphonesIcon,
  ArrowRight,
} from 'lucide-react';
import Newsletter from '../../components/sections/Newsletter';
import LandingPage from '@/pages/LandingPage';

export const Route = createFileRoute('/_app/')({
  component: LandingPage,
});


