import { useRef } from "preact/hooks";
import { JSX } from "preact/jsx-runtime";

const BearProxy = () => {
  const formRef = useRef<HTMLFormElement>();
  const inputRef = useRef<HTMLInputElement>();

  const onSubmit: JSX.SubmitEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const url = new FormData(e.currentTarget).get('url').toString() || 'https://noat.blog';
    const { pathname } = new URL(url);
    window.location.href = `/bear${pathname}`;
  };

  const onPasteClick = async () => {
    inputRef.current.value = await navigator.clipboard.readText();
    formRef.current.submit();
  };

  return (
    <form id="proxyForm" onSubmit={onSubmit} ref={formRef}>
      <input
        type="url"
        name="url"
        placeholder="noatblog link here..."
        pattern=".*noat\.blog.*"
        ref={inputRef}
      />
      <input type="submit" value="Go!"/>
      <button type="button" onClick={onPasteClick}>Paste and go!</button>
    </form>
  )
};

export default BearProxy;
