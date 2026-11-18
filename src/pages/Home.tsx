import { HeroSection } from '@/components/home/HeroSection';
import { ComparisonSection } from '@/components/home/ComparisonSection';
import { TrustedBySection } from '@/components/home/TrustedBySection';
import { CategoriesSection } from '@/components/home/CategoriesSection';
import { NewsletterSection } from '@/components/home/NewsletterSection';

export function Home() {
    return (
        <>
            <HeroSection />
            <ComparisonSection />
            <TrustedBySection />
            <CategoriesSection />
            <NewsletterSection />
        </>
    );
}
