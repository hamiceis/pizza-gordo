import React from "react";
import { ChefHat, Instagram, Facebook, Phone, MapPin } from "lucide-react";
import { StatusBadge } from "@/components/StatusBadge";

export const Footer = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-white pt-16 pb-8 border-t border-stone-200">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-pizza-red p-2 rounded-full">
                <ChefHat className="text-white w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-pizza-dark">
                Pizza do Gordo
              </span>
            </div>
            <p className="text-stone-500 text-sm leading-relaxed">
              A melhor pizza da cidade, feita com carinho e muito recheio para
              matar sua fome.
            </p>
            <div className="flex gap-4">
              <button className="bg-stone-100 p-2 rounded-full hover:bg-pizza-red hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </button>
              <button className="bg-stone-100 p-2 rounded-full hover:bg-blue-600 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-pizza-dark mb-6">Links Rápidos</h3>
            <ul className="space-y-3 text-stone-500 text-sm">
              <li>
                <button
                  onClick={() => scrollToSection("menu")}
                  className="hover:text-pizza-red"
                >
                  Cardápio Completo
                </button>
              </li>
              <li>
                <button className="hover:text-pizza-red">Nossa História</button>
              </li>
              <li>
                <button className="hover:text-pizza-red">
                  Área de Entrega
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-pizza-dark mb-6">Contato</h3>
            <ul className="space-y-3 text-stone-500 text-sm">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-pizza-red shrink-0" />
                <span>(11) 99999-9999</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-pizza-red shrink-0" />
                <span>
                  Rua das Pizzas, 123
                  <br />
                  Centro, Cidade - SP
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-pizza-dark mb-6">Horário</h3>
            <ul className="space-y-2 text-stone-500 text-sm">
              <li className="flex justify-between">
                <span>Segunda a Sábado</span>
                <span className="font-medium text-pizza-dark">
                  17:00 - 23:00
                </span>
              </li>
              <li className="flex justify-between">
                <span>Domingo</span>
                <span className="font-medium text-pizza-red">Fechado</span>
              </li>
            </ul>
            <div className="mt-6">
              <StatusBadge className="w-full justify-center py-2" />
            </div>
          </div>
        </div>

        <div className="border-t border-stone-100 pt-8 text-center text-stone-400 text-sm">
          <p>
            &copy; {new Date().getFullYear()} Pizza do Gordo. Todos os direitos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};
