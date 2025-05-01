import { useState } from 'react';
import './Admin.css';

function Admin() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState<string | null>(null);

interface BlogPost {
    title: string;
    description: string;
}

const handleBlogSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const blogPost: BlogPost = { title, description };
    try {
        const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/rest/v1/blog`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY,
                'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
            },
            body: JSON.stringify(blogPost),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to submit blog post');
        }

        setTitle('');
        setDescription('');
    } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to submit blog post');
    }
};

  return (
    <div className="admin">
      <h2>Admin Panel</h2>
      <form onSubmit={handleBlogSubmit}>
        <h3>Submit Blog Post</h3>
        {error && <div className="error">{error}</div>}
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Content"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Admin;
