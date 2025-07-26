export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="text-center text-2xl">
            © {year} Anatachubu | Made with 👾 by <a className="hover:underline" href="https://github.com/martinagabrielli" target="_blank">Martina</a>
        </footer>
    );
}
