import React, { useState, useEffect } from 'react';
import { Brain, BarChart3, Users, Shield } from 'lucide-react';

interface CardData {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
  gradient: string;
  accentColor: string;
}

const cardData: CardData[] = [
  {
    id: 1,
    title: "AI-Powered Productivity",
    subtitle: "Transform Your Workflow",
    description: "Harness the power of artificial intelligence to automate repetitive tasks, predict project outcomes, and optimize your team's productivity like never before.",
    features: [
      "Smart task automation",
      "Predictive analytics",
      "Intelligent scheduling",
      "Context-aware suggestions"
    ],
    icon: <Brain className="w-8 h-8" />,
    gradient: "from-blue-500 to-cyan-400",
    accentColor: "text-blue-600"
  },
  {
    id: 2,
    title: "Advanced Analytics",
    subtitle: "Data-Driven Decisions",
    description: "Unlock deep insights from your data with our comprehensive analytics suite. Track performance metrics, identify trends, and make informed decisions.",
    features: [
      "Real-time dashboards",
      "Custom report builder",
      "Trend analysis",
      "Performance tracking"
    ],
    icon: <BarChart3 className="w-8 h-8" />,
    gradient: "from-purple-500 to-pink-400",
    accentColor: "text-purple-600"
  },
  {
    id: 3,
    title: "Team Collaboration",
    subtitle: "Connect & Create Together",
    description: "Break down silos and foster seamless collaboration. Share ideas, track progress, and achieve goals together with powerful team-focused tools.",
    features: [
      "Real-time collaboration",
      "Version control",
      "Team messaging",
      "Shared workspaces"
    ],
    icon: <Users className="w-8 h-8" />,
    gradient: "from-green-500 to-emerald-400",
    accentColor: "text-green-600"
  },
  {
    id: 4,
    title: "Enterprise Security",
    subtitle: "Fort Knox Protection",
    description: "Your data deserves military-grade protection. Our enterprise security suite ensures your information stays safe with advanced encryption and monitoring.",
    features: [
      "End-to-end encryption",
      "Multi-factor authentication",
      "Compliance monitoring",
      "Threat detection"
    ],
    icon: <Shield className="w-8 h-8" />,
    gradient: "from-orange-500 to-red-400",
    accentColor: "text-orange-600"
  }
];

function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeCard, setActiveCard] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollTop / documentHeight;
      
      setScrollProgress(progress);
      
      // Determine active card based on scroll progress
      if (progress < 0.25) setActiveCard(0);
      else if (progress < 0.5) setActiveCard(1);
      else if (progress < 0.75) setActiveCard(2);
      else setActiveCard(3);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getCardStyle = (index: number) => {
    const isActive = index === activeCard;
    const isPast = index < activeCard;
    
    if (isActive) {
      return {
        transform: 'scale(1) translateX(0)',
        opacity: 1,
        zIndex: 10,
        left: '5%',
        width: '50%',
        top: '5%'
      };
    } else if (isPast) {
      return {
        transform: 'scale(0.25) translateX(0)',
        opacity: 0.9,
        zIndex: 5 - index,
        right: '5%',
        top: `${-20 + index * 120}px`,
        width: '40%',
        left: 'auto'
      };
    } else {
      return {
        transform: 'scale(0.8) translateX(100px)',
        opacity: 0,
        zIndex: 1,
        left: '5%',
        width: '50%',
        top: '5%'
      };
    }
  };

  return (
    <div className="relative">
      {/* Hero Section */}
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="text-center text-white px-6">
          <h1 className="text-6xl font-bold mb-6">The Future is Here</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-300">
            Discover how our innovative features can transform your business and unlock new possibilities
          </p>
          <div className="animate-bounce">
            <p className="text-sm text-gray-400">Scroll to explore</p>
          </div>
        </div>
      </div>

      {/* Cards Container */}
      <div className="relative" style={{ height: '400vh' }}>
        <div className="sticky top-0 h-screen overflow-hidden bg-gray-50">
          {cardData.map((card, index) => (
            <div
              key={card.id}
              className="absolute transition-all duration-700 ease-out"
              style={getCardStyle(index)}
            >
              <div className={`h-[90vh] rounded-2xl bg-gradient-to-br ${card.gradient} p-6 shadow-2xl flex flex-col justify-between text-white relative overflow-hidden`}>
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-20 right-20 w-32 h-32 bg-white rounded-full"></div>
                  <div className="absolute bottom-20 left-20 w-20 h-20 bg-white rounded-full"></div>
                  <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <div className="flex items-center mb-6">
                    <div className="bg-white/20 p-3 rounded-xl mr-4">
                      {card.icon}
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold mb-2">{card.title}</h2>
                      <p className="text-lg opacity-90">{card.subtitle}</p>
                    </div>
                  </div>
                  
                  <p className="text-base mb-6 opacity-90 leading-relaxed">
                    {card.description}
                  </p>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold mb-3">Key Features:</h3>
                    <ul className="space-y-3">
                      {card.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm">
                          <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom CTA */}
                <div className="relative z-10">
                  <button className="bg-white/20 hover:bg-white/30 px-6 py-2 rounded-lg text-sm font-semibold transition-all duration-300 hover:scale-105">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Section */}
      <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center text-white px-6">
          <h2 className="text-5xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-300">
            Transform your workflow with our comprehensive suite of tools and features
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 hover:scale-105">
            Start Your Journey
          </button>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="fixed bottom-8 right-8 z-50">
        <div className="bg-white/10 backdrop-blur-md rounded-full p-4">
          <div className="w-16 h-16 relative">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="8"
                fill="none"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="#3B82F6"
                strokeWidth="8"
                fill="none"
                strokeDasharray={`${scrollProgress * 283} 283`}
                className="transition-all duration-300"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white text-sm font-semibold">
                {Math.round(scrollProgress * 100)}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;