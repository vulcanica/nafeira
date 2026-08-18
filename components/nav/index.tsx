import Link from "next/link";
import { Suspense } from "react";

import { Container } from "@/components/ui/container";
import { shopConfig } from "@/lib/config";
import type { MenuItem } from "@/lib/shopify/types/menu";

import { NavAccount, NavAccountFallback } from "./account";
import { CartIcon, CartIconFallback } from "./cart";
import { MobileMenu } from "./mobile-menu";
import { QuickLinks } from "./quick-links";
import { SearchModal } from "./search-modal";
import Image from "next/image";

export async function Nav({ locale }: { locale: string }) {
  const items: MenuItem[] = [
    { id: "default-nav-shop", title: "Categorias", url: "/collections", type: "HTTP", items: [] },
    { id: "all-nav-shop", title: "Todos", url: "/collections/all", type: "HTTP", items: [] },
    { id: "quitandas-nav-shop", title: "Quitandas e Laticínios", url: "/collections/quitandas-e-laticinios", type: "HTTP", items: [] },
    { id: "doces-nav-shop", title: "Doces", url: "/collections/doces", type: "HTTP", items: [] },
    { id: "temperos-nav-shop", title: "Temperos e Acompanhamentos", url: "/collections/temperos-e-acompanhamentos", type: "HTTP", items: [] },
  ];

  return (
    <nav
      className="sticky top-0 z-30 w-full bg-background pt-[env(safe-area-inset-top,0px)] transition-shadow duration-250"
      id="nav-outer"
    >
      <Container className="flex h-16 items-center gap-2.5 md:gap-5">
        <MobileMenu items={items} />

        <Link className="flex items-center shrink-0" href="/">
          <Image src="/logo.svg" alt={shopConfig.site.name} width={200} height={65} />

        </Link>

        <QuickLinks items={items} />

        <div className="flex items-center gap-5 ml-auto">
          <SearchModal />
          {shopConfig.auth.isEnabled && (
            <Suspense fallback={<NavAccountFallback />}>
              <NavAccount />
            </Suspense>
          )}
          <Suspense fallback={<CartIconFallback />}>
            <CartIcon />
          </Suspense>
        </div>
      </Container>
    </nav>
  );
}
