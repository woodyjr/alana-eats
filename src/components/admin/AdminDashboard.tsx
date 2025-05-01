import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { BlogPostForm } from './BlogPostForm';

interface BlogPost {
  id: number;
  title: string;
  content: string;
  createddate: string;
}

export function AdminDashboard() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [activeTab, setActiveTab] = useState<'blog' | 'recipes'>('blog');

  const fetchBlogPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blogposts')
        .select('*')
        .order('createddate', { ascending: false });

      if (error) throw error;
      setBlogPosts(data || []);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
    }
  };

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      
      <div className="admin-tabs">
        <button 
          className={`tab ${activeTab === 'blog' ? 'active' : ''}`}
          onClick={() => setActiveTab('blog')}
        >
          Blog Posts
        </button>
        <button 
          className={`tab ${activeTab === 'recipes' ? 'active' : ''}`}
          onClick={() => setActiveTab('recipes')}
        >
          Recipes
        </button>
      </div>

      {activeTab === 'blog' && (
        <div className="admin-content">
          <BlogPostForm onPostSubmitted={fetchBlogPosts} />
          
          <div className="blog-posts-list">
            <h2>Existing Blog Posts</h2>
            {blogPosts.map((post) => (
              <div key={post.id} className="blog-post-item">
                <h3>{post.title}</h3>
                <p className="post-date">
                  {new Date(post.createddate).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'recipes' && (
        <div className="admin-content">
          <h2>Recipe Management</h2>
          <p>Recipe management coming soon...</p>
        </div>
      )}
    </div>
  );
} 