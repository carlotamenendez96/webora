import React, { useEffect, useRef } from "react";
import Matter from "matter-js";
import { useTranslations } from "../hooks/useTranslations";

export default function TagsPhysicsContained({ height = 300 }) {
  const { t, language } = useTranslations();
  const containerRef = useRef(null);
  const engineRef = useRef(null);
  const renderRef = useRef(null);
  const runnerRef = useRef(null);
  const wallsRef = useRef([]);
  const pillBodiesRef = useRef([]);
  const [responsiveHeight, setResponsiveHeight] = React.useState(height);

  // Tags con traducciones
  const tags = [
    { textKey: "tag_fluid_animations", color: "#00FFFF", textColor: "#1E3A8A" },
    { textKey: "tag_design", color: "#FF0080", textColor: "#FFFFFF" },
    { textKey: "tag_gsap", color: "#1E3A8A", textColor: "#FFFFFF" },
    { textKey: "tag_startup", color: "#4F46E5", textColor: "#FFFFFF" },
    { textKey: "tag_backend", color: "#00FFFF", textColor: "#1E3A8A" },
    { textKey: "tag_framer", color: "#FF0080", textColor: "#FFFFFF" },
    { textKey: "tag_animations", color: "#1E3A8A", textColor: "#FFFFFF" },
    { textKey: "tag_vue", color: "#8B5CF6", textColor: "#FFFFFF" },
    { textKey: "tag_saas", color: "#00FFFF", textColor: "#1E3A8A" },
    { textKey: "tag_web_development", color: "#FF0080", textColor: "#FFFFFF" },
    { textKey: "tag_react", color: "#3B82F6", textColor: "#FFFFFF" },
    { textKey: "tag_typescript", color: "#8B5CF6", textColor: "#FFFFFF" },
    { textKey: "tag_tailwind", color: "#06B6D4", textColor: "#FFFFFF" },
    { textKey: "tag_nodejs", color: "#1E3A8A", textColor: "#FFFFFF" },
    { textKey: "tag_api", color: "#DC2626", textColor: "#FFFFFF" },
    { textKey: "tag_seo", color: "#7C3AED", textColor: "#FFFFFF" },
    { textKey: "tag_marketing", color: "#FF0080", textColor: "#FFFFFF" },
    { textKey: "tag_branding", color: "#4F46E5", textColor: "#FFFFFF" },
    { textKey: "tag_wordpress", color: "#8B5CF6", textColor: "#FFFFFF" },
    { textKey: "tag_ecommerce", color: "#DB2777", textColor: "#FFFFFF" },
    { textKey: "tag_mobile", color: "#3B82F6", textColor: "#FFFFFF" },
  ];

  // Función para calcular altura responsiva
  const calculateHeight = () => {
    const isMobile = window.innerWidth < 768;
    return isMobile ? 500 : height;
  };

  // Actualizar altura cuando cambie el tamaño de la ventana
  React.useEffect(() => {
    const updateHeight = () => {
      setResponsiveHeight(calculateHeight());
    };

    updateHeight(); // Altura inicial
    window.addEventListener('resize', updateHeight);
    
    return () => window.removeEventListener('resize', updateHeight);
  }, [height]);

  useEffect(() => {
    // Aliases
    const Engine = Matter.Engine;
    const Render = Matter.Render;
    const Runner = Matter.Runner;
    const Composite = Matter.Composite;
    const Bodies = Matter.Bodies;
    const Mouse = Matter.Mouse;
    const MouseConstraint = Matter.MouseConstraint;
    const Events = Matter.Events;
    const Body = Matter.Body;

    // Crear motor
    const engine = Engine.create();
    engineRef.current = engine;
    const world = engine.world;

    // contenedor DOM
    const container = containerRef.current;
    const width = Math.max(300, container.clientWidth);
    const h = responsiveHeight;

    // Renderer (apunta al elemento container — no al body)
    const render = Render.create({
      element: container,
      engine,
      options: {
        width,
        height: h,
        wireframes: false,
        background: "transparent",
        pixelRatio: Math.min(window.devicePixelRatio || 1, 2),
      },
    });
    renderRef.current = render;

    // Runner
    const runner = Runner.create();
    runnerRef.current = runner;
    Runner.run(runner, engine);
    Render.run(render);

    // Helper: crear paredes según tamaño
    const createWalls = (w, hh) => {
      // si ya hay paredes anteriores, eliminarlas
      if (wallsRef.current.length) {
        wallsRef.current.forEach((pw) => Composite.remove(world, pw));
      }
      const top = Bodies.rectangle(w / 2, -25, w, 50, { 
        isStatic: true, 
        render: { 
          fillStyle: "transparent",
          strokeStyle: "transparent"
        } 
      });
      const bottom = Bodies.rectangle(w / 2, hh + 25, w, 50, { 
        isStatic: true, 
        render: { 
          fillStyle: "transparent",
          strokeStyle: "transparent"
        } 
      });
      const left = Bodies.rectangle(-25, hh / 2, 50, hh, { 
        isStatic: true, 
        render: { 
          fillStyle: "transparent",
          strokeStyle: "transparent"
        } 
      });
      const right = Bodies.rectangle(w + 25, hh / 2, 50, hh, { 
        isStatic: true, 
        render: { 
          fillStyle: "transparent",
          strokeStyle: "transparent"
        } 
      });
      wallsRef.current = [top, bottom, left, right];
      Composite.add(world, wallsRef.current);
    };

    // Función para crear las pastillas (pills)
    const createPillBodies = () => {
      // Limpiar bodies anteriores si existen
      if (pillBodiesRef.current.length) {
        pillBodiesRef.current.forEach((body) => Composite.remove(world, body));
      }

      const pillBodies = tags.map((tag, i) => {
        // Tamaños responsivos: más pequeños en móvil
        const isMobile = window.innerWidth < 768;
        const pillMinW = isMobile ? 100 : 150; // Ancho mínimo más pequeño en móvil
        const pillTextFactor = isMobile ? 10 : 14; // Factor de texto más pequeño en móvil
        const pillTextPadding = isMobile ? 30 : 50; // Padding más pequeño en móvil
        const pillH = isMobile ? 45 : 60; // Alto más pequeño en móvil
        const pillSpacing = isMobile ? 10 : 15; // Espaciado más pequeño en móvil
        
        // ancho basado en texto, mínimo pillMinW
        const tagText = t[tag.textKey as keyof typeof t];
        const pw = Math.max(pillMinW, tagText.length * pillTextFactor + pillTextPadding);
        const ph = pillH;
        // posición inicial: fila baja, con separación y algo de aleatorio
        const x = Math.min(
          width - pw / 2 - 20,
          40 + (i % 8) * (pw + pillSpacing) + (Math.random() * 12 - 6)
        );
        const y = Math.max(40, h - 80 + Math.random() * 20);
        const body = Bodies.rectangle(x, y, pw, ph, {
          chamfer: { radius: ph / 2 }, // bordes redondeados -> pill
          restitution: 0.4,
          friction: 0.02,
          density: 0.002,
          label: tagText,
          render: {
            fillStyle: tag.color,
            strokeStyle: "transparent",
            lineWidth: 0,
          },
        });
        // Guardamos ancho/alto en el body para usar al dibujar el texto (opcional)
        body._pillSize = { w: pw, h: ph, textColor: tag.textColor };
        return body;
      });
      
      pillBodiesRef.current = pillBodies;
      Composite.add(world, pillBodies);
    };

    // Crear tags iniciales
    createPillBodies();

    // añadir paredes al mundo
    createWalls(width, h);

    // Mouse / touch
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false },
      },
    });
    Composite.add(world, mouseConstraint);
    render.mouse = mouse;

    // Si quieres que al soltar no tenga inercia, puedes interceptar el evento "enddrag"
    // y fijar velocidad a 0 o convertirlo en estático. Aquí lo dejamos con inercia por defecto.
    // Si lo prefieres sin inercia: uncomment abajo:
    /*
    Events.on(mouseConstraint, "enddrag", (ev) => {
      if (ev.body) {
        Body.setVelocity(ev.body, { x: 0, y: 0 });
        Body.setAngularVelocity(ev.body, 0);
      }
    });
    */

    // Dibujar texto encima de cada pastilla en el canvas
    Matter.Events.on(render, "afterRender", () => {
      const ctx = render.context;
      // Tamaño de fuente responsivo: más pequeño en móvil
      const isMobile = window.innerWidth < 768;
      const fontSize = isMobile ? 14 : 20;
      
      pillBodiesRef.current.forEach((body) => {
        ctx.save();
        ctx.translate(body.position.x, body.position.y);
        ctx.rotate(body.angle);
        ctx.font = `600 ${fontSize}px 'Clash Display', 'Clash Display Placeholder', sans-serif`;
        ctx.fillStyle = body._pillSize?.textColor || "#000";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(body.label, 0, 0);
        ctx.restore();
      });
    });

    // Resize: rehacer render y paredes para adaptarse al contenedor
    const handleResize = () => {
      const newW = Math.max(300, container.clientWidth);
      const newH = responsiveHeight;
      Render.setPixelRatio && (render.options.pixelRatio = Math.min(window.devicePixelRatio || 1, 2));
      Render.setSize(render, newW, newH);

      // eliminar paredes viejas y crear nuevas en la nueva posición
      createWalls(newW, newH);

      // Regenerar tags con el nuevo idioma si es necesario
      createPillBodies();

      // opcional: ajustar posición de bodies dentro del nuevo ancho si están fuera
      pillBodiesRef.current.forEach((b) => {
        const halfW = (b._pillSize && b._pillSize.w / 2) || 40;
        if (b.position.x - halfW < 0) Body.setPosition(b, { x: halfW + 10, y: b.position.y });
        if (b.position.x + halfW > newW) Body.setPosition(b, { x: newW - halfW - 10, y: b.position.y });
      });
    };
    window.addEventListener("resize", handleResize);
    // inicial
    handleResize();

    // cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      Matter.Events.off(render, "afterRender");
      Composite.remove(world, mouseConstraint);
      Runner.stop(runner);
      Render.stop(render);
      // limpiar world
      try {
        Composite.clear(world, false);
        Engine.clear(engine);
      } catch (e) {
        // ignore
      }
      // quitar canvas
      if (render.canvas && render.canvas.parentNode === container) {
        render.canvas.remove();
      }
    };
  }, [responsiveHeight, language]);

  // contenedor con estilos para integrarse en la página
  return (
    <div
      style={{
        width: "100%",
        height: `${responsiveHeight}px`,
        position: "relative",
        overflow: "hidden",
        borderRadius: 8,
        maxWidth: "100%", // Prevenir scroll horizontal
        // background: "rgba(250,250,250,0.6)", // descomenta si quieres un fondo
      }}
    >
      <div
        ref={containerRef}
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          maxWidth: "100%", // Prevenir scroll horizontal
          overflow: "hidden", // Asegurar que no haya desbordamiento
        }}
      />
    </div>
  );
}
