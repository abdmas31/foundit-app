import React, { useState } from 'react';
import { ref, update, get } from 'firebase/database';
import { db } from '../../firebase/config';
import { getAuth } from 'firebase/auth';
import ContactModal from './ContactModal';

function PostsList({ posts, type }) {
    const [selectedPost, setSelectedPost] = useState(null);
    const [showContact, setShowContact] = useState(false);
    const auth = getAuth();

    const handleContact = async (post) => {
        // Get user data for the post
        const userRef = ref(db, `users/${post.userId}`);
        const userSnapshot = await get(userRef);
        const userData = userSnapshot.val();

        setSelectedPost({
            ...post,
            userPhone: userData.phone,
            userEmail: userData.email
        });
        setShowContact(true);
    };

    const handleFoundThis = async (post) => {
        try {
            // Update post status
            const postRef = ref(db, `posts/${post.id}`);
            await update(postRef, {
                status: 'resolved',
                resolvedAt: new Date().toISOString()
            });
        } catch (error) {
            console.error('Error updating post status:', error);
        }
    };

    const isPostOwner = (post) => {
        return auth.currentUser && post.userId === auth.currentUser.uid;
    };

    if (!posts || posts.length === 0) {
        return (
            <div className="text-center text-gray-500 py-8">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No posts yet</h3>
                <p className="mt-1 text-sm text-gray-500">Get started by creating a new post.</p>
            </div>
        );
    }

    return (
        <>
            <div className="space-y-4">
                {posts.map(post => (
                    <div key={post.id} className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-lg font-medium text-gray-900">{post.title}</h3>
                                <p className="text-sm text-gray-500">
                                    Posted by {post.userName} • {new Date(post.createdAt).toLocaleDateString()}
                                </p>
                            </div>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                post.status === 'active' 
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-gray-100 text-gray-800'
                            }`}>
                                {post.status}
                            </span>
                        </div>
                        
                        <div className="mt-3">
                            <div className="flex space-x-4 text-sm text-gray-500">
                                <div>
                                    <span className="font-medium">Category:</span> {post.category}
                                </div>
                                <div>
                                    <span className="font-medium">Location:</span> {post.location}
                                </div>
                                <div>
                                    <span className="font-medium">Date:</span> {post.date}
                                </div>
                            </div>
                            
                            <p className="mt-2 text-gray-600">{post.description}</p>
                            
                            {post.type === 'lost' && post.reward && (
                                <div className="mt-2">
                                    <span className="text-sm font-medium text-gray-500">Reward:</span>
                                    <span className="ml-1 text-green-600">${post.reward}</span>
                                </div>
                            )}
                        </div>
                        
                        <div className="mt-4 flex justify-end space-x-3">
                            {!isPostOwner(post) && (
                                <button 
                                    onClick={() => handleContact(post)}
                                    className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                                >
                                    Contact
                                </button>
                            )}
                            
                            {isPostOwner(post) && post.status === 'active' && (
                                <button 
                                    onClick={() => handleFoundThis(post)}
                                    className="text-sm text-green-600 hover:text-green-800 font-medium"
                                >
                                    Mark as Found
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {showContact && selectedPost && (
                <ContactModal
                    post={selectedPost}
                    onClose={() => {
                        setShowContact(false);
                        setSelectedPost(null);
                    }}
                />
            )}
        </>
    );
}

export default PostsList;
