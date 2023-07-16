"use client"
import { ChangeEvent, FC } from "react";

const settings: FC = () => {
    async function handleChange(e:ChangeEvent) {
        const {checked} = e.target as HTMLInputElement;
        document.cookie = `theme=${checked ? `dark` : `light`}`;
    }
    function getCookie(name: string) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop()?.split(';').shift();
    }

    return (
        <div>
            <label htmlFor="title">toggle dark mode</label>
            <input onChange={handleChange} type="checkbox" name="dark" id="dark" defaultChecked={getCookie(`theme`) !== `light`} />
        </div>
    );
};

export default settings;