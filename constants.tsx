
import React from 'react';
import { Category, Worker, UserRole } from './types';

export const CATEGORIES: Category[] = [
  { id: 'repair', name: 'Repair', icon: '🛠️', color: 'bg-orange-100 text-orange-600' },
  { id: 'cleaning', name: 'Cleaning', icon: '🧹', color: 'bg-blue-100 text-blue-600' },
  { id: 'painting', name: 'Painting', icon: '🎨', color: 'bg-yellow-100 text-yellow-600' },
  { id: 'plumbing', name: 'Plumbing', icon: '🚿', color: 'bg-teal-100 text-teal-600' },
  { id: 'electric', name: 'Electric', icon: '⚡', color: 'bg-red-100 text-red-600' },
  { id: 'gardening', name: 'Gardening', icon: '🌱', color: 'bg-green-100 text-green-600' },
];

export const MOCK_WORKERS: Worker[] = [
  {
    id: 'w1',
    name: 'Antony Jose',
    // Added missing email and phone fields to satisfy UserProfile interface
    email: 'antony.jose@snapserve.io',
    phone: '+91 98765 43210',
    profession: 'Professional Painter',
    role: UserRole.WORKER,
    avatar: 'https://picsum.photos/seed/antony/200',
    rating: 4.7,
    reviewCount: 5000,
    experience: 13,
    hourlyRate: 349,
    bio: 'Expert in residential and commercial painting with over 13 years of experience.',
    portfolio: ['https://picsum.photos/seed/p1/400', 'https://picsum.photos/seed/p2/400'],
    skills: ['Wall Painting', 'Texturing', 'Outdoor'],
    isVerified: true,
    availability: 'free',
    completionRate: 98
  },
  {
    id: 'w2',
    name: 'Julian Marcu Elian',
    // Added missing email and phone fields to satisfy UserProfile interface
    email: 'julian.elian@snapserve.io',
    phone: '+91 88765 12345',
    profession: 'Master Plumber',
    role: UserRole.WORKER,
    avatar: 'https://picsum.photos/seed/julian/200',
    rating: 4.8,
    reviewCount: 2000,
    experience: 8,
    hourlyRate: 450,
    bio: 'Quick plumbing solutions for every household need.',
    portfolio: ['https://picsum.photos/seed/p3/400'],
    skills: ['Pipe Fixing', 'Leak Detection'],
    isVerified: true,
    availability: 'free',
    completionRate: 95
  },
  {
    id: 'w3',
    name: 'David Michel',
    // Added missing email and phone fields to satisfy UserProfile interface
    email: 'david.michel@snapserve.io',
    phone: '+91 77765 99999',
    profession: 'Electrician',
    role: UserRole.WORKER,
    avatar: 'https://picsum.photos/seed/david/200',
    rating: 4.9,
    reviewCount: 1200,
    experience: 5,
    hourlyRate: 299,
    bio: 'Safety first. Licensed electrician for all your wiring needs.',
    portfolio: [],
    skills: ['Wiring', 'Lighting'],
    isVerified: true,
    availability: 'busy',
    completionRate: 99
  }
];

export const COLORS = {
  primary: '#E86D44',
  secondary: '#FF7F50',
  accent: '#F9E8E2',
  bg: '#FAF6F4',
  text: '#2D2D2D',
  muted: '#7A7A7A'
};
