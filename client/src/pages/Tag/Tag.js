import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useHttpClient } from '../../hooks/useHttpClient';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import ErrorModal from '../../components/Modal/ErrorModal';
import PostList from '../../components/PostList/PostList';

const Tag = () => {
  const { sendReq, isLoading, error, clearError } = useHttpClient();
  const [loadedPosts, setLoadedPosts] = useState([]);
  const { tagName, tagId } = useParams();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const responseData = await sendReq(
          `${process.env.REACT_APP_BASE_URL}/tags/${tagName}`
        );
        setLoadedPosts(responseData.tag.posts);
      } catch (err) {}
    };
    fetchPosts();
  }, [sendReq, tagId, tagName]);
  return (
    <>
      {isLoading && <LoadingSpinner asOverlay={true} />}
      <ErrorModal error={error} onClose={clearError} />
      <div className='container-posts tag-page'>
        <h2 className='tag-page__heading'>Posts tagged with #{tagName}</h2>

        {loadedPosts && <PostList cover={false} items={loadedPosts} />}
      </div>
    </>
  );
};

export default Tag;
