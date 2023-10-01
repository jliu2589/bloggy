function Header() {
  return (
    <header className='flex flex-row justify-between pt-5 pb-10'>
      <h1>This is my blog.</h1>
      <div className='flex flex-col'>
        <div>Social media stuff</div>
        <div className='flex flex-row gap-5'>
          <div>About me</div>
          <div>Give me money</div>
        </div>
      </div>
    </header>
  );
}

export default Header;
