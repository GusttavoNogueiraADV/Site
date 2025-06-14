import React, { useRef } from 'react';

const PolaroidCard = ({ post, style, isMobile }) => {
  const isVideo = post.src.endsWith('.mp4');
  const videoRef = useRef(null);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.muted = false;
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.muted = true;
    }
  };

  const imageHeight = isMobile ? 140 : 240;
  const iconSize = isMobile ? 12 : 16; 
  const avatarSize = isMobile ? 18 : 28;
  const fontSizeName = isMobile ? 8 : 13; 
  const fontSizeCaption = isMobile ? 11 : 14;
  const checkedIconSize = isMobile ? 10 : 14;

  return (
    <div
      className="polaroid"
      style={{
        ...style,
        background: '#111',
        boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
        borderRadius: 8,
        padding: 10,
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transition: 'transform 0.4s ease, box-shadow 0.3s ease, border 0.3s ease',
        cursor: 'pointer',
        zIndex: style?.zIndex || 1,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div style={{ ...styles.header, marginBottom: 8 }}>
        <div style={{ ...styles.userInfo }}>
          <img
            src="https://zxqgsxwwkfqsawhkvspn.supabase.co/storage/v1/object/public/instagram//profile-photo.png"
            alt="avatar"
            style={{
              width: avatarSize,
              height: avatarSize,
              borderRadius: '50%',
              objectFit: 'cover',
              marginRight: 8,
            }}
          />
          <span
            style={{
              fontSize: fontSizeName,
              fontWeight: 'bold',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              whiteSpace: 'nowrap',
            }}
          >
            {post.user_name || 'advgusttavonogueira'}
            <img
              src="https://zxqgsxwwkfqsawhkvspn.supabase.co/storage/v1/object/public/instagram//checked-icon.png"
              alt="verified"
              style={{ width: checkedIconSize, height: checkedIconSize }}
            />
          </span>
        </div>
        <span style={{ fontSize: isMobile ? 13 : 18, color: 'white', cursor: 'pointer' }}>⋯</span>
      </div>

      {isVideo ? (
        <video
          ref={videoRef}
          src={post.src}
          alt={post.caption}
          style={{
            width: '100%',
            height: imageHeight,
            borderRadius: 6,
            objectFit: 'cover',
            marginBottom: 12,
          }}
          autoPlay
          loop
          muted
          playsInline
        />
      ) : (
        <img
          src={post.src}
          alt={post.caption}
          style={{
            width: '100%',
            height: imageHeight,
            borderRadius: 6,
            objectFit: 'cover',
            marginBottom: 12,
          }}
        />
      )}

      <div style={{ ...styles.actions, marginBottom: 8 }}>
        <div style={{ ...styles.leftActions, gap: 8 }}>
          <img
            src="https://zxqgsxwwkfqsawhkvspn.supabase.co/storage/v1/object/public/instagram//like-icon.png"
            alt="like"
            style={{ width: iconSize, height: iconSize, cursor: 'pointer' }}
          />
          <img
            src="https://zxqgsxwwkfqsawhkvspn.supabase.co/storage/v1/object/public/instagram//comment-icon.png"
            alt="comment"
            style={{ width: iconSize, height: iconSize, cursor: 'pointer' }}
          />
          <img
            src="https://zxqgsxwwkfqsawhkvspn.supabase.co/storage/v1/object/public/instagram//share-icon.png"
            alt="share"
            style={{ width: iconSize, height: iconSize, cursor: 'pointer' }}
          />
        </div>
        <img
          src="https://zxqgsxwwkfqsawhkvspn.supabase.co/storage/v1/object/public/instagram//save-icon.png"
          alt="save"
          style={{ width: iconSize, height: iconSize, cursor: 'pointer' }}
        />
      </div>

      <div
        style={{
          fontSize: fontSizeCaption,
          color: 'white',
          lineHeight: 1.0,
          whiteSpace: 'normal',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          marginTop: 4,
          marginBottom: 0,
        }}
      >
        <span style={{ fontWeight: 'bold' }}>
          advgusttavonogueira{' '}
          <img
            src="https://zxqgsxwwkfqsawhkvspn.supabase.co/storage/v1/object/public/instagram//checked-icon.png"
            alt="verified"
            style={{ margin: '0 .4px', width: checkedIconSize, height: checkedIconSize }}
          />
        </span>
        {post.caption.length > 45 ? post.caption.slice(0, 45) + '...' : post.caption}
      </div>

      <style>{`
        .polaroid:hover {
          transform: scale(1.05) rotate(0deg) !important;
          z-index: 10;
          box-shadow: 0 20px 40px rgba(0,0,0,0.4);
          border: 3px solid rgba(255, 255, 255, 0.7);
          transition: transform 0.4s ease, box-shadow 0.3s ease, border 0.3s ease;
        }
      `}</style>
    </div>
  );
};

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftActions: {
    display: 'flex',
  },
};

export default PolaroidCard;
