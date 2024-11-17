import './style.scss';

const proxyForm = document.querySelector('#proxyForm') as HTMLFormElement;

const openBearLink = () => {
  const link = new FormData(proxyForm).get('link')!.toString() || 'https://noat.blog';
  const { pathname } = new URL(link);
  window.location.href = `/bear${pathname}`;
}

proxyForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  openBearLink();
});

proxyForm?.querySelector('#proxyPasteGo')?.addEventListener('click', async () => {
  const clip = await navigator.clipboard.readText();
  document.querySelector('input')!.value = clip;
  openBearLink();
});
