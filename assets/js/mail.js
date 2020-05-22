export const addr = () => {
    const g = 'NSwiRh4IFEFWIyo6QRwKUA==';
    const e = 'RIM3rHg17QIIosx7';
    const o = atob(g);
    const u = o.split('');
    const l = u.map((s, t) => String.fromCharCode(e[t].charCodeAt(0) ^ s.charCodeAt(0)));

    return l.join('');
};

export const prefix = () => atob('bWF' + 'pb' + 'HRvO' + 'g==');
