import { Github, Twitter, Linkedin, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-muted py-8">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-muted-foreground">
              © {new Date().getFullYear()} 个人作品集. 保留所有权利.
            </p>
          </div>

          <div className="flex space-x-4">
            <a
              href="https://github.com/EveTrona"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="h-5 w-5" />
              <span className="sr-only">Github</span>
            </a>
            <a
              href="https://x.com/KleinMo64486448?t=hmlqtfoREvVZOyZC3MN7zg&s=05"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </a>
            <a
              href="https://www.linkedin.com/in/%E5%88%98-%E5%AE%B6%E8%93%AC-a122b7311?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </a>
            <a
              href="https://www.instagram.com/kleineve1?igsh=anV0Z285a3d2OWk2"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Instagram className="h-5 w-5" />
              <span className="sr-only">Instagram</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
