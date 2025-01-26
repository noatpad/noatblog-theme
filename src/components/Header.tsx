// import { useLocation } from 'preact-iso';

// export function Header() {
// 	const { url } = useLocation();

// 	return (
// 		<header>
// 			<nav>
// 				<a href="/" class={url == '/' && 'active'}>
// 					Home
// 				</a>
// 				<a href="/404" class={url == '/404' && 'active'}>
// 					404
// 				</a>
// 			</nav>
// 		</header>
// 	);
// }

const Header = () => (
	<header>
		<a href="/" class="title">
			<h1>noatblog theme ʕ•ᴥ•ʔ</h1>
		</a>
		<nav>
      <p>
        <a href="/">Home</a>
        <a href="/helpers">Helpers</a>
      </p>
    </nav>
	</header>
);

export default Header;
