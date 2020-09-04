function FeedbackForm() {
  return (
    <form name='feedback' method='post' data-netlify='true' action='/thankyou'>
      <input type='hidden' name='form-name' value='feedback' />
      <p>
        <label>
          Your name:
          <br />
          <input type='text' name='name' />
        </label>
      </p>
      <p>
        <label>
          Feedback:
          <br />
          <textarea name='message' />
        </label>
      </p>
      <p>
        <button type='submit'>Send</button>
      </p>
    </form>
  );
}

export { FeedbackForm };
