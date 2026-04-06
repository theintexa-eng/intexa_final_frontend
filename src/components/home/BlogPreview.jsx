import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock } from 'lucide-react';
import SectionHeading from '../shared/SectionHeading';

const posts = [
  {
    title: '5 Questions to Ask Before Hiring an Interior Designer',
    excerpt: 'Most homeowners skip these questions and pay for it later. Here\'s what to ask before you sign anything.',
    category: 'Residential',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80',
  },
  {
    title: 'How to Validate a BOQ Before Your Project Starts',
    excerpt: 'A Bill of Quantities audit can save you ₹3–8 lakhs on a mid-size project. Here\'s what to check.',
    category: 'Advisory',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80',
  },
  {
    title: 'Why "Cheap" Interior Quotes Usually Cost You More',
    excerpt: 'The real cost of under-priced proposals — and the warning signs you need to watch for.',
    category: 'Budgeting',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80',
  },
];

export default function BlogPreview() {
  return (
    <section className="py-20 lg:py-28 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="From the INTEXA Blog"
          title="Insights for smarter project decisions"
          description="Practical guidance on budgeting, studio selection, and project execution — before you commit."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          {posts.map((post, i) => (
            <article key={i} className="bg-white rounded-2xl border border-border overflow-hidden group hover:shadow-lg transition-shadow duration-300">
              <div className="aspect-[16/9] overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-semibold text-accent bg-accent/10 px-2.5 py-1 rounded-full">
                    {post.category}
                  </span>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {post.readTime}
                  </span>
                </div>
                <h3 className="font-semibold text-foreground leading-snug mb-2 group-hover:text-accent transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {post.excerpt}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link to="/contact" className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline">
            Talk to our advisory team <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}