import { useEffect, useState } from 'react';

export default function Cursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [follower, setFollower] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    let followerX = 0, followerY = 0;
    let animId;

    const onMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    const animate = () => {
      followerX += (pos.x - followerX) * 0.12;
      followerY += (pos.y - followerY) * 0.12;
      setFollower({ x: followerX, y: followerY });
      animId = requestAnimationFrame(animate);
    };

    const onMouseOver = (e) => {
      if (e.target.tagName === 'BUTTON' || e.target.tagName === 'A' || e.target.closest('button') || e.target.closest('a')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onMouseOver);
    animId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onMouseOver);
      cancelAnimationFrame(animId);
    };
  }, [pos.x, pos.y]);

  return (
    <>
      <div className="cursor" style={{
        left: pos.x - 6,
        top: pos.y - 6,
        transform: isHovering ? 'scale(2.5)' : 'scale(1)',
      }} />
      <div className="cursor-follower" style={{
        left: follower.x - 20,
        top: follower.y - 20,
        transform: isHovering ? 'scale(1.5)' : 'scale(1)',
        opacity: isHovering ? 0.8 : 0.4,
      }} />
    </>
  );
}
