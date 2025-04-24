
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Custom colors for CommunityConnect
				community: {
					50: '#f5f7fa',
					100: '#e4e7eb',
					200: '#cbd2d9',
					300: '#9aa5b1',
					400: '#7b8794',
					500: '#616e7c',
					600: '#52606d',
					700: '#3e4c59',
					800: '#323f4b',
					900: '#1f2933',
				},
				accent1: {
					DEFAULT: '#3182ce',
					50: '#ebf8ff',
					100: '#bee3f8',
					200: '#90cdf4',
					300: '#63b3ed',
					400: '#4299e1',
					500: '#3182ce',
					600: '#2b6cb0',
					700: '#2c5282',
					800: '#2a4365',
					900: '#1A365D',
				},
				accent2: {
					DEFAULT: '#38a169',
					50: '#f0fff4',
					100: '#c6f6d5',
					200: '#9ae6b4',
					300: '#68d391',
					400: '#48bb78',
					500: '#38a169',
					600: '#2f855a',
					700: '#276749',
					800: '#22543d',
					900: '#1C4532',
				},
			},
			fontFamily: {
				sans: ['SF Pro Display', 'Inter', 'system-ui', 'sans-serif'],
				display: ['SF Pro Display', 'Inter', 'system-ui', 'sans-serif'],
				mono: ['SF Mono', 'monospace'],
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' },
				},
				fadeIn: {
					from: { opacity: '0' },
					to: { opacity: '1' },
				},
				slideUp: {
					from: { transform: 'translateY(20px)', opacity: '0' },
					to: { transform: 'translateY(0)', opacity: '1' },
				},
				slideDown: {
					from: { transform: 'translateY(-20px)', opacity: '0' },
					to: { transform: 'translateY(0)', opacity: '1' },
				},
				scaleIn: {
					from: { transform: 'scale(0.95)', opacity: '0' },
					to: { transform: 'scale(1)', opacity: '1' },
				},
				float: {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' },
				},
				spotlight: {
					'0%': { opacity: '0', transform: 'translate(-72%, -62%) scale(0.5)' },
					'100%': { opacity: '1', transform: 'translate(-50%,-40%) scale(1)' },
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				fadeIn: 'fadeIn 0.5s ease-out forwards',
				slideUp: 'slideUp 0.5s ease-out forwards',
				slideDown: 'slideDown 0.5s ease-out forwards',
				scaleIn: 'scaleIn 0.5s ease-out forwards',
				float: 'float 6s ease-in-out infinite',
				spotlight: 'spotlight 2s ease forwards',
			},
			boxShadow: {
				subtle: '0 2px 10px rgba(0, 0, 0, 0.05)',
				glass: '0 8px 32px rgba(0, 0, 0, 0.06)',
				highlight: '0 0 0 2px rgba(49, 130, 206, 0.1)',
			},
			backdropBlur: {
				xs: '2px',
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
