import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Pizza } from "lucide-react";

export const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 text-center animate-in fade-in duration-500">
      <div className="bg-pizza-red/10 p-8 rounded-full mb-8 relative">
        <Pizza className="w-24 h-24 text-pizza-red animate-pulse" />
        <span className="absolute -top-2 -right-2 text-6xl font-black text-pizza-orange transform rotate-12">
          ?
        </span>
      </div>

      <h1 className="text-6xl md:text-8xl font-black text-foreground mb-4">
        404
      </h1>

      <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
        Ops! Pizza não encontrada
      </h2>

      <p className="text-muted-foreground max-w-md text-lg mb-10">
        Parece que a página que você tentou acessar foi comida ou nunca existiu.
        Mas não se preocupe, temos muitas outras pizzas esperando por você!
      </p>

      <Link to="/">
        <Button
          size="lg"
          className="rounded-full px-8 shadow-lg hover:shadow-xl text-lg h-14"
        >
          <ArrowLeft className="mr-2 w-5 h-5" />
          Voltar para o Cardápio
        </Button>
      </Link>
    </div>
  );
};
