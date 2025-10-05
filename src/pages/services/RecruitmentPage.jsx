import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const RecruitmentPage = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-4">Recruitment Service</h1>
      <p className="text-muted-foreground mb-8">
        Advanced AI-powered Recruitment solutions for your business.
      </p>
      <Button onClick={() => navigate('/pricing')}>
        Get Started
      </Button>
    </div>
  );
};

export default RecruitmentPage;
