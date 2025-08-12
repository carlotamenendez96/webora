import React, { useEffect, useRef, useState } from "react";

const tags = [
  { text: "Wordpress", color: "#9AFEBA", textColor: "#1C2128" },
  { text: "Diseño", color: "#FFF863", textColor: "#1C2128" },
  { text: "G-sap", color: "#111111", textColor: "#FFFFFF" },
  { text: "Startup", color: "#111111", textColor: "#FFFFFF" },
  { text: "From Scratch", color: "#4353FF", textColor: "#FFFFFF" },
  { text: "Framer", color: "#BDFE00", textColor: "#1C2128" },
  { text: "Animaciones", color: "#9AFEBA", textColor: "#1C2128" },
  { text: "Framer", color: "#BDFE00", textColor: "#1C2128" },
  { text: "SAAS", color: "#FFF863", textColor: "#1C2128" },
  { text: "Wordpress to Framer", color: "#FFF863", textColor: "#1C2128" },
];

interface PhysicsBody {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  angularVelocity: number; // Velocidad de rotación
  width: number;
  height: number;
  isDragging: boolean;
  dragOffsetX: number;
  dragOffsetY: number;
  lastMouseX: number; // Para calcular la velocidad al lanzar
  lastMouseY: number;
}

export default function PhysicsTagsHTML() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [bodies, setBodies] = useState<PhysicsBody[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [dragIndex, setDragIndex] = useState(-1);
  const animationRef = useRef<number>(0);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Inicializar posiciones de las pastillas
    const initialBodies: PhysicsBody[] = tags.map((tag, i) => ({
      x: 100 + (i % 5) * 150,
      y: 50 + Math.floor(i / 5) * 70,
      vx: 0,
      vy: 0,
      rotation: Math.random() * Math.PI * 2, // Rotación aleatoria inicial
      angularVelocity: 0,
      width: Math.max(100, tag.text.length * 10),
      height: 40,
      isDragging: false,
      dragOffsetX: 0,
      dragOffsetY: 0,
      lastMouseX: 0,
      lastMouseY: 0,
    }));

    setBodies(initialBodies);
    setIsInitialized(true);

    // Física básica
    const gravity = 0.6;
    const friction = 0.995;
    const bounce = 0.7;
    const angularFriction = 0.99;

    const updatePhysics = () => {
      setBodies(prevBodies => 
        prevBodies.map((body, index) => {
          if (body.isDragging) return body;

          let newVx = body.vx * friction;
          let newVy = body.vy + gravity;
          let newX = body.x + newVx;
          let newY = body.y + newVy;
          let newAngularVelocity = body.angularVelocity * angularFriction;
          let newRotation = body.rotation + newAngularVelocity;

          // Colisiones con los bordes más realistas
          if (newX - body.width / 2 < 0) {
            newX = body.width / 2;
            newVx = -newVx * bounce;
            // Añadir rotación al rebotar
            newAngularVelocity += newVx * 0.1;
          }
          if (newX + body.width / 2 > width) {
            newX = width - body.width / 2;
            newVx = -newVx * bounce;
            newAngularVelocity += newVx * 0.1;
          }
          if (newY + body.height / 2 > height) {
            newY = height - body.height / 2;
            newVy = -newVy * bounce;
            // Reducir velocidad horizontal al tocar el suelo
            newVx *= 0.8;
            // Añadir rotación basada en la velocidad horizontal
            newAngularVelocity += newVx * 0.05;
          }
          if (newY - body.height / 2 < 0) {
            newY = body.height / 2;
            newVy = -newVy * bounce;
            newAngularVelocity += newVx * 0.1;
          }

          // Detener rotación si es muy pequeña
          if (Math.abs(newAngularVelocity) < 0.01) {
            newAngularVelocity = 0;
          }

          return {
            ...body,
            x: newX,
            y: newY,
            vx: newVx,
            vy: newVy,
            rotation: newRotation,
            angularVelocity: newAngularVelocity,
          };
        })
      );

      animationRef.current = requestAnimationFrame(updatePhysics);
    };

    updatePhysics();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const handleMouseDown = (e: React.MouseEvent, index: number) => {
    if (bodies.length === 0) return;
    const body = bodies[index];
    if (!body) return;

    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    setDragIndex(index);
    setIsDragging(true);
    setBodies(prev => prev.map((b, i) => 
      i === index 
        ? { 
            ...b, 
            isDragging: true, 
            dragOffsetX: mouseX - b.x, 
            dragOffsetY: mouseY - b.y,
            lastMouseX: mouseX,
            lastMouseY: mouseY
          }
        : b
    ));
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || dragIndex === -1) return;

    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    setBodies(prev => prev.map((b, i) => 
      i === dragIndex 
        ? { 
            ...b, 
            x: mouseX - b.dragOffsetX, 
            y: mouseY - b.dragOffsetY,
            lastMouseX: mouseX,
            lastMouseY: mouseY
          }
        : b
    ));
  };

  const handleMouseUp = () => {
    if (dragIndex !== -1) {
      // Calcular velocidad al soltar basada en el movimiento del mouse
      const body = bodies[dragIndex];
      if (body && body.isDragging) {
        const velocityX = (body.lastMouseX - (body.x + body.dragOffsetX)) * 0.3;
        const velocityY = (body.lastMouseY - (body.y + body.dragOffsetY)) * 0.3;
        const angularVelocity = velocityX * 0.02; // Rotación basada en velocidad horizontal

        setBodies(prev => prev.map((b, i) => 
          i === dragIndex 
            ? { 
                ...b, 
                isDragging: false,
                vx: velocityX,
                vy: velocityY,
                angularVelocity: angularVelocity
              }
            : b
        ));
      }
    }
    setIsDragging(false);
    setDragIndex(-1);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove as any);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove as any);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragIndex, bodies]);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "400px",
        position: "relative",
        background: "transparent",
        overflow: "hidden",
        cursor: isDragging ? "grabbing" : "default",
      }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {isInitialized && tags.map((tag, i) => {
        const body = bodies[i];
        if (!body) return null;

        return (
          <div
            key={i}
            id="physics-body"
            draggable={false}
            style={{
              position: "absolute",
              padding: "10px 20px",
              borderRadius: "50px",
              backgroundColor: tag.color,
              color: tag.textColor,
              fontWeight: "600",
              fontFamily: "sans-serif",
              textAlign: "center",
              userSelect: "none",
              cursor: body.isDragging ? "grabbing" : "grab",
              whiteSpace: "nowrap",
              transform: `translate(-50%, -50%) rotate(${body.rotation}rad) translate(50%, 50%)`,
              top: body.y,
              left: body.x,
              width: body.width,
              height: body.height,
            }}
            onMouseDown={(e) => handleMouseDown(e, i)}
          >
            {tag.text}
          </div>
        );
      })}
    </div>
  );
}