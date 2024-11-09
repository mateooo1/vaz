import type { MetaFunction } from '@remix-run/node';
import OnboardingForm from '../components/OnboardingForm';

export const meta: MetaFunction = () => {
  return [
    { title: 'Onboarding' },
    { name: 'description', content: 'Welcome to Remix+Vite!' },
  ];
};

export default function Index() {
  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="bg-white dark:bg-zinc-900 rounded-lg p-8 max-w-lg w-full">
        <OnboardingForm />
      </div>
    </main>
  );
}