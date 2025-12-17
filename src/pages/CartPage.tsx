import { useCartStore } from "@/store/cartStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  MapPin,
  Store,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { z } from "zod";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Helmet } from "react-helmet-async";

// ==========================================
// DEFINIÇÃO DO SCHEMA DE VALIDAÇÃO (ZOD)
// ==========================================
// Define as regras de validação do formulário.
// Utilizamos .refine() no final para validar condicionalmente o endereço
// (obrigatório apenas se o método for 'entrega').
const cartSchema = z
  .object({
    name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
    phone: z.string().min(10, "Informe um telefone válido com DDD"),
    deliveryMethod: z.enum(["entrega", "retirada"]),
    address: z.string().optional(),
    paymentMethod: z.enum(["pix", "cartao", "dinheiro"]),
    notes: z.string().optional(),
  })
  .refine(
    (data) => {
      // Se for entrega, o endereço deve estar preenchido e ter tamanho mínimo
      if (data.deliveryMethod === "entrega") {
        return !!data.address && data.address.length >= 5;
      }
      return true; // Se for retirada, endereço é opcional/ignorado
    },
    {
      message: "O endereço é obrigatório para entrega e deve ser completo",
      path: ["address"], // Aponta o erro para o campo 'address'
    }
  );

// Infere o tipo TypeScript a partir do schema Zod
type CartFormData = z.infer<typeof cartSchema>;

export const CartPage = () => {
  const { items, updateQuantity, removeItem, getTotal } = useCartStore();
  const total = getTotal();

  // ==========================================
  // CONFIGURAÇÃO DO REACT HOOK FORM
  // ==========================================
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CartFormData>({
    resolver: zodResolver(cartSchema),
    defaultValues: {
      name: "",
      phone: "",
      deliveryMethod: "entrega",
      address: "",
      paymentMethod: "pix",
      notes: "",
    },
  });

  // Observa o valor de deliveryMethod em tempo real para renderização condicional
  const deliveryMethod = watch("deliveryMethod");
  const paymentMethod = watch("paymentMethod");

  // ==========================================
  // FUNÇÃO DE ENVIO DO FORMULÁRIO
  // ==========================================
  const onSubmit = (data: CartFormData) => {
    const phoneNumber = "5511999999999";

    // Montagem da mensagem para o WhatsApp
    let message = `🍕 *PEDIDO - PIZZA DO GORDO*\n\n`;
    message += `*Cliente:* ${data.name}\n`;
    message += `*Telefone:* ${data.phone}\n`;
    message += `*Tipo:* ${
      data.deliveryMethod === "entrega" ? "🛵 Entrega" : "🏪 Retirada"
    }\n\n`;

    message += `*ITENS:* \n`;
    items.forEach((item) => {
      message += `• ${item.quantity}x ${item.name} - R$ ${(
        item.price * item.quantity
      ).toFixed(2)}\n`;
    });
    message += `\n*Obs:* ${data.notes || "-"}\n`;
    message += `\n💰 *TOTAL: R$ ${total.toFixed(2)}*\n`;
    message += `💳 *Pagamento:* ${data.paymentMethod.toUpperCase()}\n`;

    // Inclui endereço apenas se for entrega
    if (data.deliveryMethod === "entrega") {
      message += `📍 *Endereço:* ${data.address}`;
    }

    // Codifica e abre o link do WhatsApp
    const encodedMessage = encodeURIComponent(message);
    window.open(
      `https://wa.me/${phoneNumber}?text=${encodedMessage}`,
      "_blank"
    );
    toast.success("Pedido gerado! Enviando para o WhatsApp...");
  };

  // Renderização de estado vazio (sem itens no carrinho)
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background pt-24 pb-12 px-4 flex flex-col items-center justify-center text-center animate-in fade-in duration-300">
        <div className="bg-pizza-orange/10 p-8 rounded-full mb-6">
          <ShoppingBag className="w-16 h-16 text-pizza-orange" />
        </div>
        <h2 className="text-3xl font-bold text-foreground mb-4">
          Seu carrinho está vazio
        </h2>
        <p className="text-muted-foreground mb-8 max-w-md">
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
    <>
      <Helmet>
        <title>Finalizar Pedido | Pizza do Gordo</title>
        <meta
          name="description"
          content="Finalize seu pedido com segurança e rapidez. Escolha entre entrega ou retirada e pague como preferir."
        />
      </Helmet>
      <div className="min-h-screen bg-background pt-24 pb-12 px-4 animate-in fade-in duration-500">
        <div className="container mx-auto max-w-6xl">
          <Link to="/">
            <Button
              variant="ghost"
              className="mb-6 hover:bg-transparent hover:text-pizza-red pl-0"
            >
              <ArrowLeft className="mr-2 w-4 h-4" /> Continuar Comprando
            </Button>
          </Link>

          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8 flex items-center gap-3">
            <span className="bg-pizza-red text-white p-2 rounded-lg shadow-md">
              <ShoppingBag className="w-8 h-8" />
            </span>
            Finalizar Pedido
          </h1>

          <div className="grid lg:grid-cols-12 gap-8">
            {/* ==========================================
                COLUNA DA ESQUERDA: LISTA DE ITENS
               ========================================== */}
            <div className="lg:col-span-7 space-y-6">
              <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden">
                <div className="p-6 border-b border-border bg-muted/30">
                  <h2 className="font-bold text-xl text-foreground flex items-center gap-2">
                    Itens do Pedido{" "}
                    <Badge className="ml-2 bg-foreground text-background">
                      {items.reduce((a, b) => a + b.quantity, 0)}
                    </Badge>
                  </h2>
                </div>
                <div className="divide-y divide-border">
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
                          <h3 className="font-bold text-lg text-foreground">
                            {item.name}
                          </h3>
                          <p className="font-bold text-pizza-red text-lg">
                            {new Intl.NumberFormat("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            }).format(item.price * item.quantity)}
                          </p>
                        </div>
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                          {item.description}
                        </p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center bg-muted rounded-lg border border-border">
                            <button
                              type="button" // Importante: type button para não submeter form
                              onClick={() => updateQuantity(item.id, -1)}
                              className="p-2 hover:bg-background text-muted-foreground transition-colors"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-10 text-center font-medium">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, 1)}
                              className="p-2 hover:bg-stone-200 text-stone-600 transition-colors"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeItem(item.id)}
                            className="text-muted-foreground hover:text-destructive transition-colors p-2"
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
                <p className="text-muted-foreground text-sm mb-4">
                  Não esqueça da sobremesa! Temos pizzas doces incríveis
                  esperando por você.
                </p>
                <Link to="/">
                  <Button
                    variant="outline"
                    className="bg-card border-orange-200 text-pizza-orange hover:bg-orange-50"
                  >
                    Ver mais opções
                  </Button>
                </Link>
              </div>
            </div>

            {/* ==========================================
                COLUNA DA DIREITA: FORMULÁRIO DE PEDIDO
               ========================================== */}
            <div className="lg:col-span-5">
              <Card className="sticky top-24 shadow-xl border-t-4 border-t-pizza-red overflow-hidden">
                <div className="p-6 bg-muted/30 border-b border-border">
                  <h2 className="font-bold text-xl text-foreground mb-1">
                    Finalização
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Escolha como deseja receber seu pedido.
                  </p>
                </div>

                {/* Início do Form gerenciado pelo React Hook Form */}
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="p-6 space-y-5"
                >
                  {/* Campo NOME */}
                  <div className="space-y-2">
                    <Label htmlFor="name">Seu Nome</Label>
                    <Input
                      id="name"
                      placeholder="Como podemos te chamar?"
                      {...register("name")} // Registra o campo no RHF
                      className={errors.name ? "border-red-500" : ""}
                    />
                    {errors.name && (
                      <span className="text-xs text-red-500 font-medium">
                        {errors.name.message}
                      </span>
                    )}
                  </div>

                  {/* Campo TELEFONE */}
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefone / WhatsApp</Label>
                    <Input
                      id="phone"
                      placeholder="(11) 99999-9999"
                      {...register("phone")}
                      className={errors.phone ? "border-red-500" : ""}
                    />
                    {errors.phone && (
                      <span className="text-xs text-red-500 font-medium">
                        {errors.phone.message}
                      </span>
                    )}
                  </div>

                  {/* Seletor TIPO DE ENTREGA (Usando Controller para componentes controlados) */}
                  <div className="space-y-2">
                    <Label>Tipo de Entrega</Label>
                    <Controller
                      name="deliveryMethod"
                      control={control}
                      render={({ field }) => (
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o tipo de entrega" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="entrega">
                              <div className="flex items-center gap-2">
                                <div className="bg-pizza-red/10 p-1 rounded">
                                  <MapPin className="w-4 h-4 text-pizza-red" />
                                </div>
                                Entrega em Domicílio
                              </div>
                            </SelectItem>
                            <SelectItem value="retirada">
                              <div className="flex items-center gap-2">
                                <div className="bg-pizza-orange/10 p-1 rounded">
                                  <Store className="w-4 h-4 text-pizza-orange" />
                                </div>
                                Retirada no Balcão
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>

                  {/* Campo ENDEREÇO (Renderizado Condicionalmente) */}
                  {deliveryMethod === "entrega" && (
                    <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
                      <Label htmlFor="address">Endereço Completo</Label>
                      <Textarea
                        id="address"
                        placeholder="Rua, Número, Bairro, Complemento..."
                        {...register("address")}
                        className={cn(
                          "min-h-[80px]",
                          errors.address ? "border-red-500" : ""
                        )}
                      />
                      {errors.address && (
                        <span className="text-xs text-red-500 font-medium">
                          {errors.address.message}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Seleção de FORMA DE PAGAMENTO */}
                  <div className="space-y-3">
                    <Label>Forma de Pagamento</Label>
                    <div className="grid grid-cols-3 gap-2">
                      {["pix", "cartao", "dinheiro"].map((method) => (
                        <button
                          key={method}
                          type="button"
                          onClick={() =>
                            setValue("paymentMethod", method as any)
                          } // Atualiza o valor no RHF
                          className={cn(
                            "flex flex-col items-center justify-center p-3 border rounded-lg transition-all duration-200",
                            paymentMethod === method
                              ? "border-pizza-red bg-red-50 text-pizza-red shadow-sm transform scale-105"
                              : "border-input text-muted-foreground hover:bg-muted hover:border-foreground/20"
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

                  {/* Campo OBSERVAÇÕES */}
                  <div className="space-y-2">
                    <Label htmlFor="notes">Observações</Label>
                    <Input
                      id="notes"
                      placeholder="Ex: Sem cebola, capricha no orégano..."
                      {...register("notes")}
                    />
                  </div>

                  {/* RESUMO DE VALORES */}
                  <div className="border-t border-border pt-4 mt-4 space-y-2">
                    <div className="flex justify-between text-muted-foreground">
                      <span>Subtotal</span>
                      <span>
                        {new Intl.NumberFormat("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        }).format(total)}
                      </span>
                    </div>
                    {deliveryMethod === "entrega" ? (
                      <div className="flex justify-between text-muted-foreground">
                        <span>Taxa de Entrega</span>
                        <span className="text-green-600 font-medium">
                          Grátis
                        </span>
                      </div>
                    ) : (
                      <div className="flex justify-between text-muted-foreground">
                        <span>Retirada</span>
                        <span className="text-green-600 font-medium">
                          Sem custo
                        </span>
                      </div>
                    )}

                    <div className="flex justify-between text-2xl font-bold text-foreground pt-2 border-t border-border">
                      <span>Total</span>
                      <span className="text-pizza-red">
                        {new Intl.NumberFormat("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        }).format(total)}
                      </span>
                    </div>
                  </div>

                  {/* Botão de Enviar */}
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
    </>
  );
};
