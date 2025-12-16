import React, { useEffect, useState } from "react";
import { Badge } from "./ui/UIComponents";
import { Clock } from "lucide-react";

export const StatusBadge: React.FC<{ className?: string }> = ({
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const checkStatus = () => {
      const now = new Date();
      const hour = now.getHours();
      const day = now.getDay(); // 0 é Domingo

      // Lógica: Aberto 17h - 23h, Seg (1) a Sáb (6)
      // Fechado aos Domingos (0)
      const isWorkingDay = day >= 1 && day <= 6;
      const isWorkingHour = hour >= 17 && hour < 23;

      setIsOpen(isWorkingDay && isWorkingHour);
    };

    checkStatus();
    const interval = setInterval(checkStatus, 60000); // Verifica a cada minuto
    return () => clearInterval(interval);
  }, []);

  if (isOpen) {
    return (
      <Badge variant="success" className={className}>
        <span className="w-2 h-2 rounded-full bg-white mr-2 animate-pulse" />
        Aberto Agora (Fecha às 23h)
      </Badge>
    );
  }

  return (
    <Badge variant="danger" className={className}>
      <Clock className="w-3 h-3 mr-1" />
      Fechado (Abre às 17h)
    </Badge>
  );
};
