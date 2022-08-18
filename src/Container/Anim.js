import React, { useRef, useEffect, useState } from "react";
import './anim.css'
import {GiStrikingArrows} from 'react-icons/gi';
import {GiSupersonicArrow} from 'react-icons/gi';





function Anim() {
    const trailRefs = useRef([]);
    const lastMousePosition = useRef({ x: 0, y: 0 });
    const rAFIndex = useRef(0);
    const [isDragging, setIsDragging] = useState(0);
    function registerMousePosition({ clientX, clientY }) {
        lastMousePosition.current.x = clientX;
        lastMousePosition.current.y = clientY;
    }

    function startDrag() {
        setIsDragging(1);
    }

    function stopDrag() {
        setIsDragging(0);
    }

    function drawCircles() {
        for (let i = 0; i < 20; i++) {
            trailRefs.current.push(React.createRef());
        }

        return [...Array(20)].map((item, index) => {
            const ease = index * 0.05;
            return (
                <>
                <div 
                    style={{ position: "absolute",fontSize:100, color: "green", transition: `transform ${ease}s` }}
                    ref={trailRefs.current[index]} >
                        <GiSupersonicArrow/>
 
                </div>

                </>
                
            );
        });
    }
    function updateCollectedLettersPosition() {
        for (let i = 0; i < 100; i++) {
            const xpos = lastMousePosition.current.x;
            const ypos = lastMousePosition.current.y;
            trailRefs.current[
                i
            ].current.style.transform = `translate(${xpos}px, ${ypos}px)`;
        }
    }

    useEffect(() => {
        function update() {
            if (isDragging) {
                rAFIndex.current = requestAnimationFrame(update);
            }
            updateCollectedLettersPosition();
        }

        // cancel the existing rAF
        cancelAnimationFrame(rAFIndex.current);

        document.addEventListener("mousedown", startDrag);
        document.addEventListener("mouseup", stopDrag);
        document.addEventListener("mousemove", registerMousePosition);
        rAFIndex.current = requestAnimationFrame(update);

        return () => {
            document.removeEventListener("mousemove", registerMousePosition);
            document.removeEventListener("mousedown", startDrag);
            document.removeEventListener("mouseup", stopDrag);
        };
    }, [isDragging]);
    return (
        <div>
            <div>{drawCircles()}</div>
        </div>

    )
}

export default Anim
