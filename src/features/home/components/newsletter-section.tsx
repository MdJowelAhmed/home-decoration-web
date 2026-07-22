"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/container";
import { FadeIn } from "@/components/shared/fade-in";

export function NewsletterSection() {
  return (
    <section className="py-16 md:py-20">
      <Container>
        <FadeIn>
          <div className="rounded-2xl border border-border bg-card p-8 text-center md:p-16">
            <h2 className="font-serif text-3xl font-medium md:text-4xl">
              Stay in the Loop
            </h2>
            <p className="mx-auto mt-3 max-w-md text-muted-foreground">
              Subscribe for exclusive access to new collections, design tips, and
              special offers.
            </p>
            <form
              className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
              onSubmit={(e) => e.preventDefault()}
            >
              <Input
                type="email"
                placeholder="Your email address"
                required
                aria-label="Email for newsletter"
                className="flex-1"
              />
              <Button type="submit" variant="accent">
                Subscribe
              </Button>
            </form>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
