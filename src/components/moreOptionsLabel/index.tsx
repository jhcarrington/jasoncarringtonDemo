import React, { Component } from "react";
import styles from './styles.module.css';
export default class moreOptionsLabel extends Component<{}, {
    open: boolean
}> {
    constructor(props: any) {
        super(props);

        this.state = {
            open: false
        }
    }
    componentDidMount() {
        let object = document.getElementById("object");
        if(!!!object) return;
        object.addEventListener("click", () => {
            this.setState({ open: !this.state.open })
        })
    }

    render() {
        return (
            <div id="object" style={{ alignItems: 'center', display: 'flex', flexDirection: 'row' }}>
                {/* <style>{`:root{
                    --element-open: ${this.state.open ? "running" : "paused"}
                    --element-rotation: ${this.state.open ? `90deg` : `90deg`}
                }`}</style> */}
                Show Code
                <img className={this.state.open ? styles.imageOpen : styles.imageClose} src={require("../../assets/next.svg")} style={{
                    objectFit: 'contain',
                    width: 25,
                    height: 25,
                }} />
            </div>
        );
    }
}
