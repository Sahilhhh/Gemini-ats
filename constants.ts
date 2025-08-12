
import { Job } from './types';

export const INITIAL_JOBS: Job[] = [
  {
    id: '1',
    title: 'Senior Frontend Engineer',
    company: 'InnovateTech',
    location: 'Remote',
    type: 'Full-time',
    description: 'We are seeking a highly skilled Senior Frontend Engineer to lead the development of our next-generation web applications. You will work with a talented team to build intuitive and high-performance user interfaces.',
    responsibilities: [
      'Develop and maintain user-facing features using React and TypeScript.',
      'Collaborate with product managers and designers to create a seamless user experience.',
      'Optimize applications for maximum speed and scalability.',
      'Write clean, maintainable, and well-documented code.'
    ],
    qualifications: [
      '5+ years of experience in frontend development.',
      'Expertise in React, TypeScript, and modern JavaScript (ES6+).',
      'Strong understanding of HTML5, CSS3, and responsive design.',
      'Experience with state management libraries like Redux or Zustand.',
      'Familiarity with RESTful APIs and modern authorization mechanisms.'
    ]
  },
  {
    id: '2',
    title: 'Product Manager',
    company: 'Solutions Co.',
    location: 'New York, NY',
    type: 'Full-time',
    description: 'We are looking for an experienced Product Manager to guide the success of our product and lead the cross-functional team that is responsible for improving it. This is an important role that will shape the future of our offerings.',
    responsibilities: [
      'Define the product vision, roadmap, and growth opportunities.',
      'Work with engineering, design, and marketing to launch new features.',
      'Analyze market and competitive conditions to create a product that stands out.',
      'Translate product strategy into detailed requirements and prototypes.'
    ],
    qualifications: [
      'Proven experience as a Product Manager or similar role.',
      'Experience in product lifecycle management.',
      'Strong technical background with understanding and/or hands-on experience in software development and web technologies.',
      'Excellent written and verbal communication skills.',
      'BSc/BA in Computer Science, Engineering or related field.'
    ]
  }
];
