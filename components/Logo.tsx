import React from 'react';

// Storing the base64 string in a constant for better readability and reuse.
const logoBase64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAaUAAACXCAMAAAAP92sVAAAAQlBMVEX///8AI5UAI5UAI5UAI5UAI5UAI5UAI5UAI5UAI5UAI5UAI5UAI5UAI5UAI5UAI5UAI5UAI5UAI5UAI5UAI5UAI5VWF6dKAAAAFXRSTlMAESIzRFVmd4iZqrvM3e7/73d3d3d3d5f0ygAAAvNJREFUeNrt3N1y4yAUhGEdKzswsLz/K7tAQtpNEkws7/P2Oa90zpshIUEYx3Ecx3Ecx3Ecx3Ecx3Ecx3Ecx3Ecx3Gca19ac21tLW2R5dLe2g46G1sP1loL2+Jce+n2RLutba3VMnLfO3r72trW6ky5r53eXb11bW23zJy3TvfYt7bXJk1y30t/7W1tr02c5L5X/Kq2t5tmy32/9JPa3m6bLff95Ce1vd02a+57+Yfa3m6bLff95Ce1vd02W+57+Zva3m6bLff98Ke1vV02W+57+We1vV02W+57+We1vV02a+57+We1vV02W+77yZ/W9nabrLk330t/Wtvbbbbk3l//rbW93TZL7vvJT2t7u22W3PdLn6nt7bZbc99LflLb222z5L5X/Kq2t9tmy33v6B9re7tt1sxy3z96e9vatlpmzrtnd1/b2tarTJG3TvfYt7bXJk1y3z96e9ratlpmzltne9/bWl1rNS2Zt8/e3ta2VmfK+9rS29tSk8yTt7e1tX1tLW2R5dLe2g46G1uP1mZtLW2R5dLe2g46G1uP1loL2+Jce+n2RLutba3VMnLfO3r72trW6ky5r53eXb11bW23zJy3TvfYt7bXJk1y30t/7W1tr02c5L5X/Kq2t5tmy32/9JPa3m6bLff95Ce1vd02a+57+Yfa3m6bLff95Ce1vd02W+57+Zva3m6bLff98Ke1vV02W+57+We1vV02W+57+We1vV02a+57+We1vV02W+77yZ/W9nabrLk330t/Wtvbbbbk3l//rbW93TZL7vvJT2t7u22W3PdLn6nt7bZbc99LflLb222z5L5X/Kq2t9tmy33v6B9re7tt1sxy3z96e9vatlpmzrtnd1/b2tarTJG3TvfYt7bXJk1y3z96e9ratlpmzltne9/bWl1rNS2Zt8/e3ta2VmfK+9rS29tSk8yTt7e1tX1tLW2R5dLe2g46G1uP1mZtLW2R5dLe2g7+A+eI4juM4juM4juM4juM4juM4juM4juM4jqN0/gEy/SOW/kG2SAAAAABJRU5ERGkJggg==";

interface LogoProps {
  className?: string;
  applyBlend?: boolean;
}

export const TelyaLogo: React.FC<LogoProps> = ({ className, applyBlend = false }) => (
  <img 
    src={logoBase64} 
    alt="Telya Agency Logo" 
    aria-label="Telya Agency Logo"
    className={`${className} ${applyBlend ? 'mix-blend-screen' : ''}`}
  />
);
