"use client";

import React from "react";

export const Benefits: React.FC = () => {
  return (
    <div className="container benefits">
      <div className="benefit">
        <div className="circle lime">★</div>
        <div><b>PREMIUM QUALITY</b><span>High-quality materials with perfect finishing</span></div>
      </div>
      <div className="benefit">
        <div className="circle pink">✎</div>
        <div><b>FULLY CUSTOMIZABLE</b><span>Your logo, name, design — we make it happen</span></div>
      </div>
      <div className="benefit">
        <div className="circle lime">✓</div>
        <div><b>ON-TIME DELIVERY</b><span>Committed to your deadlines</span></div>
      </div>
      <div className="benefit">
        <div className="circle pink">☎</div>
        <div><b>DEDICATED SUPPORT</b><span>We're here to help before & after your order</span></div>
      </div>
    </div>
  );
};