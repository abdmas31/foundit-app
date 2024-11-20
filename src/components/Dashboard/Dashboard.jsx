import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth, db } from '../../firebase/config';
import { ref, onValue, query, orderByChild } from 'firebase/database';
import CreatePost from '../Posts/CreatePost';
import PostsList from '../Posts/PostsList';

function Dashboard() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('lost');
    const [showCreatePost, setShowCreatePost] = useState(false);
    const [posts, setPosts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    const categories = [
        'All',
        'Electronics',
        'Jewelry',
        'Documents',
        'Pets',
        'Clothing',
        'Accessories',
        'Other'
    ];

    useEffect(() => {
        if (!auth.currentUser) {
            setLoading(false);
            navigate('/login');
            return;
        }

        // Fetch user data
        const userRef = ref(db, 'users/' + auth.currentUser.uid);
        const unsubscribeUser = onValue(userRef, (snapshot) => {
            setUserData(snapshot.val());
        });

        // Fetch posts
        const postsRef = ref(db, 'posts');
        const postsQuery = query(postsRef, orderByChild('createdAt'));
        
        const unsubscribePosts = onValue(postsQuery, (snapshot) => {
            const postsData = [];
            snapshot.forEach((childSnapshot) => {
                postsData.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                });
            });
            setPosts(postsData.reverse()); // Show newest first
            setLoading(false);
        });

        return () => {
            unsubscribeUser();
            unsubscribePosts();
        };
    }, [navigate]);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/login');
        } catch (error) {
            console.error('Error logging out:', error);
            setError(error.message);
        }
    };

    const handleNewPost = () => {
        setShowCreatePost(true);
    };

    const handlePostSuccess = () => {
        // Post was created successfully
        setShowCreatePost(false);
    };

    const filteredPosts = posts.filter(post => {
        const matchesType = post.type === activeTab;
        const matchesSearch = searchTerm === '' || 
            post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.location.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === '' || selectedCategory === 'All' || 
            post.category === selectedCategory;

        return matchesType && matchesSearch && matchesCategory;
    });

    const stats = {
        active: posts.filter(post => post.type === activeTab && post.status === 'active').length,
        resolved: posts.filter(post => post.type === activeTab && post.status === 'resolved').length,
        total: posts.filter(post => post.type === activeTab).length
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="text-xl">Loading user data...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="text-xl text-red-600">Error: {error}</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Navigation Bar */}
            <nav className="bg-white shadow-lg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <h1 className="text-2xl font-semibold font-sans text-gray-900 mr-4 ml-4">FoundIt</h1>
                        </div>
                        <div className="flex items-center space-x-4">
                            <span className="text-gray-600">Welcome, {userData?.firstName}!</span>
                            <button
                                onClick={handleLogout}
                                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                {/* Tabs */}
                <div className="flex space-x-4 mb-6">
                    <button
                        className={`px-6 py-3 rounded-lg font-medium ${
                            activeTab === 'lost'
                                ? 'bg-blue-600 text-white'
                                : 'bg-white text-gray-600 hover:bg-gray-50'
                        }`}
                        onClick={() => setActiveTab('lost')}
                    >
                        Lost Items
                    </button>
                    <button
                        className={`px-6 py-3 rounded-lg font-medium ${
                            activeTab === 'found'
                                ? 'bg-blue-600 text-white'
                                : 'bg-white text-gray-600 hover:bg-gray-50'
                        }`}
                        onClick={() => setActiveTab('found')}
                    >
                        Found Items
                    </button>
                </div>

                {/* Content Area */}
                <div className="bg-white shadow rounded-lg p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold">
                            {activeTab === 'lost' ? 'Lost Items' : 'Found Items'}
                        </h2>
                        <button
                            onClick={handleNewPost}
                            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                        >
                            <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                            </svg>
                            New Post
                        </button>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="text-lg font-medium text-gray-900">Active Posts</h3>
                            <p className="text-3xl font-bold text-blue-600">{stats.active}</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="text-lg font-medium text-gray-900">Resolved</h3>
                            <p className="text-3xl font-bold text-green-600">{stats.resolved}</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="text-lg font-medium text-gray-900">Total Posts</h3>
                            <p className="text-3xl font-bold text-yellow-600">{stats.total}</p>
                        </div>
                    </div>

                    {/* Search and Filter */}
                    <div className="flex space-x-4 mb-6">
                        <div className="flex-1">
                            <input
                                type="text"
                                placeholder="Search posts..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="">All Categories</option>
                            {categories.map(category => (
                                <option key={category} value={category}>{category}</option>
                            ))}
                        </select>
                    </div>

                    {/* Posts List */}
                    <PostsList posts={filteredPosts} type={activeTab} />
                </div>
            </div>

            {/* Create Post Modal */}
            {showCreatePost && (
                <CreatePost
                    type={activeTab}
                    onClose={() => setShowCreatePost(false)}
                    onSuccess={handlePostSuccess}
                />
            )}
        </div>
    );
}

export default Dashboard;
