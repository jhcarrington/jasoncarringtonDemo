import { useEffect, useRef } from 'react';
import { getMediaUrl, MediaUrls } from '../../utils';

interface Viewport {
    bottom: number,
    top: number,
    right: number,
    left: number,
}

const initialPosition: Position = {
    x: 0,
    y: 0
};

interface Position {
    x: number,
    y: number,
}
export default function JasonPicture(): JSX.Element {
    const imageWidth = 50;

    const position = initialPosition;
    const nextPosition = initialPosition;
    const viewport: Viewport = {
        bottom: 0,
        left: 0,
        right: 0,
        top: 0
    };

    const targetElement = useRef<HTMLImageElement>();

    useEffect(() => {
        resetViewport();
        targetElement.current?.addEventListener('mousedown', mouseStartListener);
        targetElement.current?.addEventListener('touchstart', touchStartListener, { passive: false });
        window.addEventListener('scroll', () => {
            if (targetElement?.current) {
                targetElement.current.style.top = `${window.scrollY + 10}px`;
            }
        });
    });

    function resetViewport(): void {
        if (!targetElement.current?.parentElement) {
            return;
        }
        const viewportRect = targetElement.current.parentElement?.getBoundingClientRect();
        viewport.right = viewportRect.width;
        viewport.left = 0;
        viewport.bottom = window.innerHeight;
        viewport.top = 0;
    }

    function touchStartListener(event: TouchEvent): void {
        event.preventDefault();
        position.x = event.touches[0].screenX;
        position.y = event.touches[0].screenY;
        dragStart('touch');
    }

    function mouseStartListener(event: MouseEvent): void {
        event.preventDefault();
        position.x = event.clientX;
        position.y = event.clientY;
        dragStart('mouse');
    }

    function dragStart(strategy: 'touch' | 'mouse'): void {
        resetViewport();
        if (strategy === 'mouse') {
            document.addEventListener('mousemove', mouseMoveListener, true);
            document.addEventListener('mouseup', mouseUpListener, true);
        } else if (strategy === 'touch') {
            document.addEventListener('touchmove', touchMoveListener, true);
            document.addEventListener('touchend', touchUpListener, true);
        }
    }

    function touchMoveListener(event: TouchEvent): void {
        event.preventDefault();

        drag({
            x: event.touches[0].clientX,
            y: event.touches[0].clientY
        });
    }

    function mouseMoveListener(event: MouseEvent): void {
        event.preventDefault();

        drag({
            x: event.clientX,
            y: event.clientY
        });
    }

    function drag(clientPosition: Position): void {
        if (!targetElement.current) {
            return;
        }
        // calculate the new cursor position:
        nextPosition.x = position.x - clientPosition.x;
        nextPosition.y = position.y - clientPosition.y;
        position.x = clientPosition.x;
        position.y = clientPosition.y;

        const imageRadius = imageWidth / 2;
        if (!((nextPosition.x - imageRadius < viewport.left) ||
            (nextPosition.x + imageRadius > viewport.right)
        )) {
            targetElement.current.style.left = `${nextPosition.x - imageRadius}px`;
        }

        if (!((nextPosition.y - imageRadius < viewport.top) ||
            (nextPosition.y + imageRadius > viewport.bottom)
        )) {
            targetElement.current.style.top = `${window.scrollY + nextPosition.y - imageRadius}px`;
        }
    }

    function mouseUpListener(): void {
        document.removeEventListener('mousemove', mouseMoveListener, true);
        document.removeEventListener('mouseup', mouseUpListener, true);
    }

    function touchUpListener(): void {
        document.removeEventListener('touchmove', touchMoveListener, true);
        document.removeEventListener('touchend', touchUpListener, true);
    }

    return (
        <img
            ref={ref => targetElement?.current ? (targetElement.current = (ref ?? undefined)) : null}
            id="jasonImage"
            src={getMediaUrl(MediaUrls.JasonPicture)}
            style={{
                right: 10,
                top: 10,
                borderRadius: 25,
                height: imageWidth,
                objectFit: 'cover',
                backgroundPosition: 'center',
                width: imageWidth,
                zIndex: 99
            }}></img>
    );
}
