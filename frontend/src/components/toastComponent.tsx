function ToastComponent() {
  return (
    <>
      <div className="toast toast-end toast-middle">
        <div className="alert alert-info">
          <span>New mail arrived.</span>
        </div>
        <div className="alert alert-success">
          <span>Message sent successfully.</span>
        </div>
      </div>
    </>
  );
}

export default ToastComponent;
