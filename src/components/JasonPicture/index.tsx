import React, { Component } from 'react';
type ViewPort = {
    bottom: number,
    top: number,
    right: number,
    left: number
}
const initialPosition = {
    x: 0,
    y: 0
}
export default class JasonPicture extends Component<{}, {}>{
    rect: DOMRect | null = null;
    viewport: ViewPort = {
        bottom: 0,
        left: 0,
        right: 0,
        top: 0
    };
    initialPos = initialPosition;
    nextPos = initialPosition;
    componentDidMount() {
        //Handles mouse touches
        var moveableElement = document.getElementById("jasonImage");

        if (moveableElement) {
            this.dragElement(moveableElement, this.viewport, this.rect || undefined);
            moveableElement.addEventListener('touchstart', (event) => {
                event.preventDefault();
                // get the mouse cursor position at startup:
                this.initialPos = {
                    x: event.touches[0].screenX,
                    y: event.touches[0].screenY
                }
                this.rect = moveableElement?.getBoundingClientRect() || null;

                this.viewport.bottom = window.innerHeight;
                this.viewport.top = 0;
                this.viewport.left = 0;
                this.viewport.right = window.innerWidth - 20;
            });

            moveableElement.addEventListener('touchmove', (event) => {
                event = event || window.event
                event.preventDefault();
                this.rect = moveableElement?.getBoundingClientRect() || null;
                if (!this.rect || !moveableElement) {
                    return;
                }
                this.nextPos = {
                    x: this.initialPos.x - event.touches[0].screenX,
                    y: this.initialPos.y - event.touches[0].screenY
                }
                this.initialPos = {
                    x: event.touches[0].screenX,
                    y: event.touches[0].screenY
                }
                //calculate new position
                var newLeft = moveableElement.offsetLeft - this.nextPos.x;
                var newTop = moveableElement.offsetTop - this.nextPos.y;

                if (!checkBoundaries(newLeft, newTop, this.viewport, this.rect)) {
                    moveableElement.style.top = `${newTop}px`;
                    moveableElement.style.left = `${newLeft}px`;
                }
            });
        }

        window.addEventListener('scroll', () => {
            if (moveableElement) {
                moveableElement.style.top = `${window.scrollY + 10}px`;
            }
        })
    }
    dragElement = (elmnt: HTMLElement, viewport: ViewPort, rect?: DOMRect) => {
        var initialPos = initialPosition;
        var nextPos = initialPosition;
        elmnt.onmousedown = dragMouseDown;

        /**
         * Begin tracking drag
         */
        function dragMouseDown(event: MouseEvent) {
            event = event || window.event;
            event.preventDefault();
            // get the mouse cursor position at startup
            initialPos = {
                x: event.clientX,
                y: event.clientY
            }
            rect = elmnt.getBoundingClientRect();
            viewport.bottom = window.innerHeight;
            viewport.right = window.innerWidth - 20;
            document.onmouseup = closeDragElement;
            // call a function whenever the cursor moves
            document.onmousemove = elementDrag;
        }
        /**
         * Drag the element
         */
        function elementDrag(event: MouseEvent) {
            if (!rect) {
                return;
            }
            event = event || window.event;
            event.preventDefault();
            // calculate the new cursor position:
            nextPos = {
                x: initialPos.x - event.clientX,
                y: initialPos.y - event.clientY
            }
            initialPos = {
                x: event.clientX,
                y: event.clientY
            }
            var newLeft = elmnt.offsetLeft - nextPos.x;
            var newTop = elmnt.offsetTop - nextPos.y;

            if (!checkBoundaries(newLeft, newTop, viewport, rect)) {
                elmnt.style.top = `${elmnt.offsetTop - nextPos.y}px`;
                elmnt.style.left = `${elmnt.offsetLeft - nextPos.x}px`;
            }
        }

        function closeDragElement() {
            // stop moving when mouse button is released
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }
    render() {
        return (
            <img id="jasonImage" src={require('../../assets/jasonPicture.JPG')} style={{
                right: 10,
                top: 10,
                borderRadius: 25,
                height: 50,
                objectFit: 'cover',
                backgroundPosition: 'center',
                width: 50,
                zIndex: 99
            }}></img>
        );
    }
}
function checkBoundaries(newLeft: number, newTop: number, viewport: ViewPort, rect: DOMRect): boolean {
    return newLeft < viewport.left
        || newTop < viewport.top
        || newLeft + rect.width > viewport.right
        || newTop + rect.height > viewport.bottom;
}