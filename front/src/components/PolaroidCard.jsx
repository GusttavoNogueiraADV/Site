import React, { useRef } from 'react';

const PolaroidCard = ({ post, style }) => {
    const isVideo = post.src.endsWith('.mp4');  // Verifica se a mídia é um vídeo

    const videoRef = useRef(null); // Usado para controlar o áudio do vídeo

    // Função para ativar/desativar áudio no hover
    const handleMouseEnter = () => {
        if (videoRef.current) {
            videoRef.current.muted = false; // Ativa o áudio no hover
        }
    };

    const handleMouseLeave = () => {
        if (videoRef.current) {
            videoRef.current.muted = true; // Desativa o áudio quando sair o hover
        }
    };

    return (
        <div
            className="polaroid"
            style={style}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div style={styles.header}>
                <div style={styles.userInfo}>
                    <img
                        src="https://zxqgsxwwkfqsawhkvspn.supabase.co/storage/v1/object/public/instagram//profile-photo.png"
                        alt="avatar"
                        style={styles.avatar}
                    />
                    <span style={styles.name}>
                        {post.user_name || 'advgusttavonogueira'}
                        <img
                            src="https://zxqgsxwwkfqsawhkvspn.supabase.co/storage/v1/object/public/instagram//checked-icon.png"
                            alt="verified"
                            style={styles.checkedIcon}
                        />
                    </span>
                </div>
                <span style={styles.options}>⋯</span>
            </div>

            {isVideo ? (
                <video
                    ref={videoRef}
                    src={post.src}
                    alt={post.caption}
                    style={styles.video}
                    autoPlay
                    loop
                    muted
                    playsInline
                />
            ) : (
                <img src={post.src} alt={post.caption} style={styles.image} />
            )}

            <div style={styles.actions}>
                <div style={styles.leftActions}>
                    <img
                        src="https://zxqgsxwwkfqsawhkvspn.supabase.co/storage/v1/object/public/instagram//like-icon.png"
                        alt="like"
                        style={styles.icon}
                    />
                    <img
                        src="https://zxqgsxwwkfqsawhkvspn.supabase.co/storage/v1/object/public/instagram//comment-icon.png"
                        alt="comment"
                        style={styles.icon}
                    />
                    <img
                        src="https://zxqgsxwwkfqsawhkvspn.supabase.co/storage/v1/object/public/instagram//share-icon.png"
                        alt="share"
                        style={styles.icon}
                    />
                </div>
                <img
                    src="https://zxqgsxwwkfqsawhkvspn.supabase.co/storage/v1/object/public/instagram//save-icon.png"
                    alt="save"
                    style={styles.saveIcon}
                />
            </div>

            <div style={styles.caption}>
                <span style={{ fontWeight: 'bold' }}>advgusttavonogueira <img
                    src="https://zxqgsxwwkfqsawhkvspn.supabase.co/storage/v1/object/public/instagram//checked-icon.png"
                    alt="verified"
                    style={{ margin: '0 3px', width: '10px', height: '10px' }}
                /></span>
                {post.caption.length > 45 ? post.caption.slice(0, 45) + '...' : post.caption}
            </div>


            <style>
                {`
          .polaroid {
            position: absolute;
            width: 260px; /* Aumentando apenas a largura do cartão */
            height: 380px; /* Aumentando apenas a altura do cartão */
            background: #111;
            box-shadow: 0 10px 20px rgba(0,0,0,0.2);
            transition: transform 0.4s ease, box-shadow 0.3s ease, border 0.3s ease;
            border-radius: 8px;
            padding: 10px;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          }

          .polaroid:hover {
            transform: scale(1.05) rotate(0deg) !important;
            z-index: 10;
            box-shadow: 0 20px 40px rgba(0,0,0,0.4);
            border: 3px solid rgba(255, 255, 255, 0.7); /* Brilho nas bordas */
          }
        `}
            </style>
        </div>
    );
};

const styles = {
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '8px',
    },
    userInfo: {
        display: 'flex',
        alignItems: 'center',
    },
    avatar: {
        width: '28px',
        height: '28px',
        borderRadius: '50%',
        objectFit: 'cover',
        marginRight: '8px',
    },
    name: {
        fontSize: '13px',
        fontWeight: '500',
        fontWeight: 'bold',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
    },
    checkedIcon: {
        width: '14px',
        height: '14px',
    },
    options: {
        fontSize: '18px',
        color: 'white',
        cursor: 'pointer',
    },
    image: {
        width: '100%',
        height: '240px',
        objectFit: 'cover',
        borderRadius: '6px',
        marginBottom: '12px',
    },
    video: {
        width: '100%',
        height: '240px',
        objectFit: 'cover',
        borderRadius: '6px',
        marginBottom: '12px',
    },
    actions: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '8px',
    },
    leftActions: {
        display: 'flex',
        gap: '8px',
    },
    icon: {
        width: '16px',
        height: '16px',
        cursor: 'pointer',
    },
    saveIcon: {
        width: '16px',
        height: '16px',
        cursor: 'pointer',
    },
    caption: {
        fontSize: '14px',
        color: 'white',
        lineHeight: '1.0',
        whiteSpace: 'normal',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        marginTop: '4px',
        marginBottom: '0px',
    },
};

export default PolaroidCard;
