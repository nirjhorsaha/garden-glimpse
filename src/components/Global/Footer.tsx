import { Link } from "@nextui-org/link";

const Footer =() => {
  return (
      <>
          <footer className="w-full flex items-center justify-center py-3 mt-auto">
              <Link
                className="flex items-center gap-1 text-current"
                href="/"
                title="Garden Glimpse homepage"
              >
                <span className="text-default-600">Powered by</span>
                <p className="bg-gradient-to-r from-sky-500 from-30% to-green-500 to-70% inline-block text-transparent bg-clip-text">Garden Glimpse</p>
              </Link>
            </footer>
    </>
  );
};

export default Footer;