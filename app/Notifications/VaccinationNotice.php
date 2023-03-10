<?php

namespace App\Notifications;

use App\Models\Child;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class VaccinationNotice extends Notification
{
    use Queueable;

    public $child;
    public $vaccineName;

    public function __construct(Child $child, $vaccineName)
    {
        $this->child = $child;
        $this->vaccineName = $vaccineName;
    }

    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->greeting('Hye ' . $notifiable->name)
            ->line(
                'Your child named ' . $this->child->name . ' 
                needs to take a vaccine called '
                    . $this->vaccineName .
                    ' this month'
            )
            ->line('Thank you for using our application!');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
