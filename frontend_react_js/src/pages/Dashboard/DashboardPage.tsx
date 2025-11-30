import React from 'react';
import { Card, CardBody } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { useNavigate } from 'react-router-dom';
import { Briefcase, FlaskConical, Search } from 'lucide-react';

/**
 * PUBLIC_INTERFACE
 * Dashboard landing showing three perspectives with consistent minimalist icons
 * and CTAs routing to their pages. Ocean Professional theme styling applied.
 */
export default function DashboardPage() {
  const navigate = useNavigate();

  const cards = [
    {
      id: 'stakeholder',
      title: 'Stakeholder',
      desc: 'High-level insights, KPIs, and summaries tailored for conservation leaders and decision makers.',
      icon: Briefcase,
      to: '/stakeholder',
      cta: 'Open Stakeholder View',
    },
    {
      id: 'researcher',
      title: 'Researcher',
      desc: 'Deep-dive analysis, timelines, and behavior filters designed for field researchers.',
      icon: FlaskConical,
      to: '/researcher',
      cta: 'Open Researcher View',
    },
    {
      id: 'similar',
      title: 'Similar Results',
      desc: 'Explore behavior segments similar to a selected pattern across times and cameras.',
      icon: Search,
      to: '/similar-results',
      cta: 'Explore Similar Results',
    },
  ];

  return (
    <div className="space-y-6">
      <header className="flex items-end justify-between">
        <div>
          <h1 className="font-heading text-2xl font-semibold text-neutral-900">Choose a Perspective</h1>
          <p className="text-sm text-neutral-600">
            Navigate by role to keep focus and clarity. You can switch perspectives anytime.
          </p>
        </div>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map(({ id, title, desc, icon: Icon, to, cta }) => (
          <Card key={id} className="overflow-hidden transition-shadow hover:shadow-lg">
            <CardBody className="p-5">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-md border border-blue-900/20 bg-gradient-to-br from-blue-900/10 to-amber-600/10">
                  <Icon className="h-5 w-5 text-primary" aria-hidden />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-semibold text-neutral-900">{title}</h3>
                  <p className="mt-1 text-sm leading-5 text-neutral-600">{desc}</p>
                </div>
              </div>
              <div className="mt-4">
                <Button onClick={() => navigate(to)}>{cta}</Button>
              </div>
            </CardBody>
          </Card>
        ))}
      </section>
    </div>
  );
}
