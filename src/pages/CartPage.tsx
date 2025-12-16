import React, { useState } from "react";
import { useCartStore } from "@/store/cartStore";
import {
  Button,
  Input,
  Textarea,
  Label,
  Card,
  cn,
  Badge,
} from "@/components/ui/UIComponents";
import {
  Minus,
  Plus,
  Trash2,
  ArrowLeft,
  ShoppingBag,
  Phone,
  QrCode,
  CreditCard,
  Banknote,
  CheckCircle,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { z } from "zod";
import { toast } from "sonner";

// Esquema de validação com Zod
const cartSchema = z.object({
  name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
  phone: z.string().min(10, "Informe um telefone válido com DDD"),
  address: z.string().min(5, "O endereço deve ser mais detalhado"),
  paymentMethod: z.enum(["pix", "cartao", "dinheiro"]),
  notes: z.string().optional(),
});

type CartFormData = z.infer<typeof cartSchema>;

export const CartPage: React.FC = () => {
  const { items, updateQuantity, removeItem, getTotal } = useCartStore();
  const [formData, setFormData] = useState<CartFormData>({
    name: "",
    phone: "",
    address: "",
    paymentMethod: "pix",
    notes: "",
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof CartFormData, string>>
  >({});

  const total = getTotal();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Limpar erro ao digitar
    if (errors[name as keyof CartFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handlePaymentSelect = (method: "pix" | "cartao" | "dinheiro") => {
    setFormData((prev) => ({ ...prev, paymentMethod: method }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validação com Zod
    const result = cartSchema.safeParse(formData);

    if (!result.success) {
      const formattedErrors: Partial<Record<keyof CartFormData, string>> = {};
      result.error.issues.forEach((issue) => {
        formattedErrors[issue.path[0] as keyof CartFormData] = issue.message;
      });
      setErrors(formattedErrors);
      toast.error("Por favor, verifique os campos do formulário.");
      return;
    }

    const phoneNumber = "5511999999999";

    let message = `🍕 *PEDIDO - PIZZA DO GORDO*\n\n`;
    message += `*Cliente:* ${formData.name}\n`;
    message += `*Telefone:* ${formData.phone}\n\n`;
    message += `*ITENS:* \n`;
    items.forEach((item) => {
      message += `• ${item.quantity}x ${item.name} - R$ ${(
        item.price * item.quantity
      ).toFixed(2)}\n`;
    });
    message += `\n*Obs:* ${formData.notes || "-"}\n`;
    message += `\n💰 *TOTAL: R$ ${total.toFixed(2)}*\n`;
    message += `💳 *Pagamento:* ${formData.paymentMethod.toUpperCase()}\n`;
    message += `📍 *Endereço:* ${formData.address}`;

    const encodedMessage = encodeURIComponent(message);
    window.open(
      `https://wa.me/${phoneNumber}?text=${encodedMessage}`,
      "_blank"
    );
    toast.success("Pedido gerado! Enviando para o WhatsApp...");
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] pt-24 pb-12 px-4 flex flex-col items-center justify-center text-center animate-in fade-in duration-300">
        <div className="bg-pizza-orange/10 p-8 rounded-full mb-6">
          <ShoppingBag className="w-16 h-16 text-pizza-orange" />
        </div>
        <h2 className="text-3xl font-bold text-pizza-dark mb-4">
          Seu carrinho está vazio
        </h2>
        <p className="text-stone-500 mb-8 max-w-md">
          Parece que você ainda não escolheu sua pizza favorita. Volte ao
          cardápio e faça seu pedido!
        </p>
        <Link to="/">
          <Button size="lg" className="rounded-full px-8 shadow-md">
            <ArrowLeft className="mr-2 w-5 h-5" />
            Voltar ao Cardápio
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] pt-24 pb-12 px-4 animate-in fade-in duration-500">
      <div className="container mx-auto max-w-6xl">
        <Link to="/">
          <Button
            variant="ghost"
            className="mb-6 hover:bg-transparent hover:text-pizza-red pl-0"
          >
            <ArrowLeft className="mr-2 w-4 h-4" /> Continuar Comprando
          </Button>
        </Link>

        <h1 className="text-3xl md:text-4xl font-bold text-pizza-dark mb-8 flex items-center gap-3">
          <span className="bg-pizza-red text-white p-2 rounded-lg shadow-md">
            <ShoppingBag className="w-8 h-8" />
          </span>
          Finalizar Pedido
        </h1>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Coluna Esquerda: Itens */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden">
              <div className="p-6 border-b border-stone-100 bg-stone-50/50">
                <h2 className="font-bold text-xl text-pizza-dark flex items-center gap-2">
                  Itens do Pedido{" "}
                  <Badge className="ml-2 bg-pizza-dark">
                    {items.reduce((a, b) => a + b.quantity, 0)}
                  </Badge>
                </h2>
              </div>
              <div className="divide-y divide-stone-100">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="p-6 flex gap-4 md:gap-6 items-start"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 md:w-24 md:h-24 rounded-lg object-cover shadow-sm"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-lg text-pizza-dark">
                          {item.name}
                        </h3>
                        <p className="font-bold text-pizza-red text-lg">
                          {new Intl.NumberFormat("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          }).format(item.price * item.quantity)}
                        </p>
                      </div>
                      <p className="text-sm text-stone-500 mb-4 line-clamp-2">
                        {item.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center bg-stone-100 rounded-lg border border-stone-200">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="p-2 hover:bg-stone-200 text-stone-600 transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-10 text-center font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="p-2 hover:bg-stone-200 text-stone-600 transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-stone-400 hover:text-red-500 transition-colors p-2"
                          title="Remover item"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-orange-50/50 rounded-xl p-6 border border-orange-100">
              <h3 className="font-bold text-pizza-orange mb-2 flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Adicionou tudo?
              </h3>
              <p className="text-stone-600 text-sm mb-4">
                Não esqueça da sobremesa! Temos pizzas doces incríveis esperando
                por você.
              </p>
              <Link to="/">
                <Button
                  variant="outline"
                  className="bg-white border-orange-200 text-pizza-orange hover:bg-orange-50"
                >
                  Ver mais opções
                </Button>
              </Link>
            </div>
          </div>

          {/* Coluna Direita: Formulário de Pedido */}
          <div className="lg:col-span-5">
            <Card className="sticky top-24 shadow-xl border-t-4 border-t-pizza-red overflow-hidden">
              <div className="p-6 bg-stone-50 border-b border-stone-100">
                <h2 className="font-bold text-xl text-pizza-dark mb-1">
                  Dados da Entrega
                </h2>
                <p className="text-sm text-stone-500">
                  Preencha para finalizar seu pedido no WhatsApp.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="name">Seu Nome</Label>
                  <Input
                    id="name"
                    name="name"
                    required
                    placeholder="Como podemos te chamar?"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={errors.name ? "border-red-500" : ""}
                  />
                  {errors.name && (
                    <span className="text-xs text-red-500 font-medium">
                      {errors.name}
                    </span>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone / WhatsApp</Label>
                  <Input
                    id="phone"
                    name="phone"
                    required
                    placeholder="(11) 99999-9999"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={errors.phone ? "border-red-500" : ""}
                  />
                  {errors.phone && (
                    <span className="text-xs text-red-500 font-medium">
                      {errors.phone}
                    </span>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Endereço Completo</Label>
                  <Textarea
                    id="address"
                    name="address"
                    required
                    placeholder="Rua, Número, Bairro, Complemento..."
                    className={cn(
                      "min-h-[80px]",
                      errors.address ? "border-red-500" : ""
                    )}
                    value={formData.address}
                    onChange={handleInputChange}
                  />
                  {errors.address && (
                    <span className="text-xs text-red-500 font-medium">
                      {errors.address}
                    </span>
                  )}
                </div>

                <div className="space-y-3">
                  <Label>Forma de Pagamento</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {["pix", "cartao", "dinheiro"].map((method) => (
                      <button
                        key={method}
                        type="button"
                        onClick={() => handlePaymentSelect(method as any)}
                        className={cn(
                          "flex flex-col items-center justify-center p-3 border rounded-lg transition-all duration-200",
                          formData.paymentMethod === method
                            ? "border-pizza-red bg-red-50 text-pizza-red shadow-sm transform scale-105"
                            : "border-stone-200 text-stone-500 hover:bg-stone-50 hover:border-stone-300"
                        )}
                      >
                        {method === "pix" && (
                          <QrCode className="w-5 h-5 mb-1" />
                        )}
                        {method === "cartao" && (
                          <CreditCard className="w-5 h-5 mb-1" />
                        )}
                        {method === "dinheiro" && (
                          <Banknote className="w-5 h-5 mb-1" />
                        )}
                        <span className="text-xs font-semibold capitalize">
                          {method === "cartao"
                            ? "Cartão"
                            : method.toUpperCase()}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Observações</Label>
                  <Input
                    id="notes"
                    name="notes"
                    placeholder="Ex: Sem cebola, capricha no orégano..."
                    value={formData.notes}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="border-t border-stone-100 pt-4 mt-4 space-y-2">
                  <div className="flex justify-between text-stone-500">
                    <span>Subtotal</span>
                    <span>
                      {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(total)}
                    </span>
                  </div>
                  <div className="flex justify-between text-stone-500">
                    <span>Taxa de Entrega</span>
                    <span className="text-green-600 font-medium">Grátis</span>
                  </div>
                  <div className="flex justify-between text-2xl font-bold text-pizza-dark pt-2 border-t border-stone-100">
                    <span>Total</span>
                    <span className="text-pizza-red">
                      {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(total)}
                    </span>
                  </div>
                </div>

                <Button
                  type="submit"
                  variant="success"
                  className="w-full h-14 text-lg shadow-lg hover:shadow-xl transform transition-all hover:-translate-y-1"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Enviar Pedido no WhatsApp
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
