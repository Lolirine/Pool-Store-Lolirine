import React from 'react';
import { BLOG_POSTS } from '../constants';
import { ArrowRight, User, Calendar } from 'lucide-react';
import { BlogPageProps } from '../types';
import GoBackButton from '../components/GoBackButton';

const BlogPage: React.FC<BlogPageProps> = ({ goBack, canGoBack }) => {
    return (
        <div className="bg-gray-100">
            {/* Page Header */}
            <div className="bg-white py-12 text-center border-b">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl font-bold text-gray-800">Nos Conseils d'Experts</h1>
                    <p className="mt-2 text-lg text-gray-600">Le blog pour tout savoir sur l'univers de la piscine.</p>
                </div>
            </div>

            {/* Blog Grid */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                 {canGoBack && <GoBackButton onClick={goBack} className="mb-8" />}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {BLOG_POSTS.map(post => (
                        <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden group flex flex-col">
                            <img src={post.imageUrl} alt={post.title} className="w-full h-56 object-cover" />
                            <div className="p-6 flex flex-col flex-grow">
                                <div className="flex items-center text-sm text-gray-500 mb-4 space-x-4">
                                    <span className="flex items-center"><User size={14} className="mr-1.5" /> {post.author}</span>
                                    <span className="flex items-center"><Calendar size={14} className="mr-1.5" /> {post.date}</span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-cyan-600 transition-colors">{post.title}</h3>
                                <p className="text-gray-600 mb-6 flex-grow">{post.excerpt}</p>
                                <a href="#" className="font-semibold text-cyan-600 hover:text-cyan-700 mt-auto inline-flex items-center">
                                    Lire la suite <ArrowRight size={16} className="ml-1" />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BlogPage;