import { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

interface BlogPostFormProps {
  onPostSubmitted: () => void;
}

export function BlogPostForm({ onPostSubmitted }: BlogPostFormProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const { error } = await supabase
        .from('blogposts')
        .insert([
          {
            title,
            content,
            createddate: new Date().toISOString(),
          },
        ]);

      if (error) throw error;

      setTitle('');
      setContent('');
      onPostSubmitted();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while submitting the post');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="blog-post-form">
      <h2>Create New Blog Post</h2>
      
      {error && <div className="error-message">{error}</div>}
      
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          rows={10}
        />
      </div>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit Post'}
      </button>
    </form>
  );
} 