import { Fragment } from "preact";
import { useEffect } from "preact/hooks";

const Guestbook = () => {
  useEffect(() => { document.body.className = 'guestbook'; }, []);

  return (
    <Fragment>
      <script async src="https://guestbooks.meadow.cafe/resources/js/embed_script/158/script.js"></script>
      <div id="guestbooks___guestbook-form-container">
        <form id="guestbooks___guestbook-form" action="https://guestbooks.meadow.cafe/guestbook/158/submit" method="post">
          <div class="guestbooks___user-info">
            <div class="guestbooks___input-container name">
              <input placeholder="your name" type="text" id="name" name="name" required />
            </div>
            <div class="guestbooks___input-container website">
              <input placeholder="your website/blog/social media (optional)" type="url" id="website" name="website" />
            </div>
          </div>
          <div id="guestbooks___challenge-answer-container"></div>
          <div class="guestbooks___input-container">
            <textarea placeholder="your message (in plain text)" id="text" name="text" style="width: 100%; box-sizing: border-box; resize: vertical;" required></textarea>
          </div>
          <input type="submit" value="Send!" />
          <div id="guestbooks___error-message"></div>
        </form>
      </div>
      <div id="guestbooks___guestbook-made-with" style="text-align: right;">
        <small>Lovingly made with <a target="_blank" href="https://guestbooks.meadow.cafe">Guestbooks</a></small>
      </div>

      <hr />

      <h2 id="guestbooks___guestbook-messages-header">Messages</h2>
      <div id="guestbooks___guestbook-messages-container"></div>
    </Fragment>
  );
};

export default Guestbook;
