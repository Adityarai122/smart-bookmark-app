'use client';

import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-black font-sans overflow-hidden">
      <Header />
      
      <main className="flex-1 flex flex-col items-center justify-center relative">
        {/* Animated Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
            <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] animate-[float_8s_ease-in-out_infinite]" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-secondary/20 rounded-full blur-[120px] animate-[float_10s_ease-in-out_infinite_reverse]" />
            <div className="absolute top-[30%] left-[20%] w-[300px] h-[300px] bg-accent/10 rounded-full blur-[80px] animate-pulse" />
        </div>

        <div className="z-10 max-w-5xl mx-auto px-6 text-center space-y-12 py-20">
          <div className="space-y-6 animate-[fadeIn_0.8s_ease-out_forwards]">
            <h1 className="text-6xl md:text-8xl font-black tracking-tight text-gray-900 dark:text-white leading-tight">
              Organize your <br />
              <span className="text-gradient">Digital Universe</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
              Experience the smarter way to save, organize, and access your favorite content. 
              Beautiful, fast, and synced across all your devices.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-[fadeIn_1s_ease-out_forwards]">
            <Link 
              href="/dashboard" 
              className="btn-primary text-lg px-10 py-4 shadow-xl shadow-primary/20 hover:shadow-primary/40 transform hover:-translate-y-1 transition-all"
            >
              Get Started Free
            </Link>
            <Link 
              href="https://github.com/your-username/smart-bookmark-app" 
              target="_blank"
              className="glass px-10 py-4 rounded-xl font-semibold text-gray-700 dark:text-gray-200 hover:bg-white/80 dark:hover:bg-white/10 transition-all border border-gray-200 dark:border-white/10"
            >
              View on GitHub
            </Link>
          </div>

          <div className="pt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-left animate-[fadeIn_1.2s_ease-out_forwards]">
            <FeatureCard 
              title="Secure Vault" 
              description="Enterprise-grade encryption with Row Level Security keeps your data private."
              icon="🔒"
              delay="0s"
            />
            <FeatureCard 
              title="Real-time Magic" 
              description="Instant synchronization across every device. No refresh needed."
              icon="⚡"
              delay="0.1s"
            />
            <FeatureCard 
              title="Pixel Perfect" 
              description="A stunning, distraction-free interface designed for modern aesthetics."
              icon="✨"
              delay="0.2s"
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function FeatureCard({ title, description, icon, delay }: { title: string, description: string, icon: string, delay: string }) {
  return (
    <div 
        className="glass-card p-8 rounded-2xl hover:bg-white/60 dark:hover:bg-gray-800/60 transition-colors"
        style={{ animationDelay: delay }}
    >
      <div className="text-5xl mb-6">{icon}</div>
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{description}</p>
    </div>
  );
}
