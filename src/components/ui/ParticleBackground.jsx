import { useEffect, useRef } from 'react';
import { useTheme } from '../../utils/ThemeContext';

export default function ParticleBackground() {
    const canvasRef = useRef(null);
    const { theme } = useTheme();

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let particles = [];
        let mouse = { x: null, y: null, radius: 150 };

        // Configuration based on theme
        const getThemeConfig = () => ({
            particleColor: theme === 'dark' ? 'rgba(74, 222, 128, 0.5)' : 'rgba(20, 83, 45, 0.4)', // bio-400 vs deep-forest
            lineColor: theme === 'dark' ? 'rgba(74, 222, 128, 0.15)' : 'rgba(20, 83, 45, 0.1)',
            particleCount: window.innerWidth < 768 ? 40 : 80,
            connectionDistance: 100
        });

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        };

        class Particle {
            constructor(x, y) {
                this.x = x;
                this.y = y;
                this.directionX = (Math.random() * 2) - 1;
                this.directionY = (Math.random() * 2) - 1;
                this.size = Math.random() * 2 + 1;
            }

            update() {
                // Stay within canvas
                if (this.x > canvas.width || this.x < 0) this.directionX = -this.directionX;
                if (this.y > canvas.height || this.y < 0) this.directionY = -this.directionY;

                // Mouse interaction - simple repulsion/attraction or just connection
                // For "Organic" feel, let's do a gentle float, but connections are key

                this.x += this.directionX * 0.4; // Slow movement
                this.y += this.directionY * 0.4;
            }

            draw(config) {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
                ctx.fillStyle = config.particleColor;
                ctx.fill();
            }
        }

        function initParticles() {
            particles = [];
            const config = getThemeConfig();
            for (let i = 0; i < config.particleCount; i++) {
                let size = (Math.random() * 5) + 1;
                let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
                let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
                particles.push(new Particle(x, y));
            }
        }

        function connect(config) {
            let opacityValue = 1;
            for (let a = 0; a < particles.length; a++) {
                for (let b = a; b < particles.length; b++) {
                    let distance = ((particles[a].x - particles[b].x) * (particles[a].x - particles[b].x))
                        + ((particles[a].y - particles[b].y) * (particles[a].y - particles[b].y));

                    if (distance < (config.connectionDistance * config.connectionDistance)) {
                        opacityValue = 1 - (distance / 20000);
                        ctx.beginPath(); // Start a new path for EACH line to ensure clean strokes
                        ctx.strokeStyle = config.lineColor.replace('0.15)', `${opacityValue * 0.15})`).replace('0.1)', `${opacityValue * 0.1})`);
                        // Note: Simple hex/rgba replacement might be brittle, but sticking to rgba in config works
                        // Actually, simpler: define base r,g,b and just vary 'a'

                        ctx.lineWidth = 1;
                        ctx.moveTo(particles[a].x, particles[a].y);
                        ctx.lineTo(particles[b].x, particles[b].y);
                        ctx.stroke();
                    }
                }

                // Mouse connection
                if (mouse.x) {
                    let dx = mouse.x - particles[a].x;
                    let dy = mouse.y - particles[a].y;
                    let distance = dx * dx + dy * dy;
                    if (distance < (mouse.radius * mouse.radius)) {
                        ctx.beginPath();
                        ctx.strokeStyle = config.lineColor.replace('0.1)', '0.2').replace('0.15)', '0.3)'); // Stronger connection to mouse
                        ctx.lineWidth = 1;
                        ctx.moveTo(particles[a].x, particles[a].y);
                        ctx.lineTo(mouse.x, mouse.y);
                        ctx.stroke();
                    }
                }
            }
        }

        function animate() {
            const config = getThemeConfig();
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw(config);
            }
            connect(config);
            animationFrameId = requestAnimationFrame(animate);
        }

        // Event Listeners
        window.addEventListener('resize', resizeCanvas);
        window.addEventListener('mousemove', (e) => {
            mouse.x = e.x;
            mouse.y = e.y;
        });
        window.addEventListener('mouseout', () => {
            mouse.x = undefined;
            mouse.y = undefined;
        });

        // Initialize
        resizeCanvas();
        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', () => { }); // Cleanup logic simplified
            cancelAnimationFrame(animationFrameId);
        };
    }, [theme]); // Re-init functionality if theme changes (though config is checked in loop, color vars need update)

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-0 pointer-events-none"
            style={{ width: '100%', height: '100%' }}
        />
    );
}
