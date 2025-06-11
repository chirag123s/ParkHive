# ParkHive UI Components Reference

This document provides a comprehensive reference for all available UI components in the ParkHive project.

## Core UI Components (GluestackUI + NativeWind)

### Avatar
**Import Path:** `@/components/ui/avatar`
```typescript
import { Avatar, AvatarBadge, AvatarFallbackText, AvatarImage, AvatarGroup } from '@/components/ui/avatar';
```

**Available Components:**
- `Avatar` - Main container with size variants: 'xs', 'sm', 'md', 'lg', 'xl', '2xl'
- `AvatarBadge` - Badge overlay for status indicators
- `AvatarFallbackText` - Text fallback when image unavailable
- `AvatarImage` - Image component for avatar
- `AvatarGroup` - Container for multiple avatars

**Usage Example:**
```typescript
<Avatar size="xl" className="bg-blue-500">
  <AvatarFallbackText className="text-white font-semibold">JD</AvatarFallbackText>
  <AvatarImage source={{ uri: 'https://example.com/avatar.jpg' }} />
</Avatar>
```

---

### Badge
**Import Path:** `@/components/ui/badge`
```typescript
import { Badge, BadgeIcon, BadgeText } from '@/components/ui/badge';
```

**Available Props:**
- `action`: 'error', 'warning', 'success', 'info', 'muted'
- `variant`: 'solid', 'outline'
- `size`: 'sm', 'md', 'lg'

**Usage Example:**
```typescript
<Badge action="success" variant="solid" size="md">
  <BadgeText>Active</BadgeText>
</Badge>
```

---

### Box
**Import Path:** `@/components/ui/box`
```typescript
import { Box } from '@/components/ui/box';
```

**Usage Example:**
```typescript
<Box className="p-4 bg-white rounded-lg">
  Content here
</Box>
```

---

### Button
**Import Path:** `@/components/ui/button`
```typescript
import { Button, ButtonText, ButtonSpinner, ButtonIcon, ButtonGroup } from '@/components/ui/button';
```

**Available Props:**
- `action`: 'primary', 'secondary', 'positive', 'negative', 'default'
- `variant`: 'solid', 'outline', 'link'
- `size`: 'xs', 'sm', 'md', 'lg', 'xl'

**Usage Example:**
```typescript
<Button size="lg" action="primary" variant="solid" onPress={handlePress}>
  <ButtonIcon as={MapPin} />
  <ButtonText>Find Parking</ButtonText>
</Button>
```

---

### Card
**Import Path:** `@/components/ui/card`
```typescript
import { Card } from '@/components/ui/card';
```

**Available Props:**
- `size`: 'sm', 'md', 'lg'
- `variant`: 'elevated', 'outline', 'ghost', 'filled'

**Usage Example:**
```typescript
<Card size="lg" variant="elevated" className="bg-white">
  <Text>Card content</Text>
</Card>
```

---

### Heading
**Import Path:** `@/components/ui/heading`
```typescript
import { Heading } from '@/components/ui/heading';
```

**Available Props:**
- `size`: 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl'
- `as`: React.ElementType (for custom HTML elements)
- Text styling: `bold`, `underline`, `strikeThrough`, `italic`, `highlight`, `isTruncated`

**Usage Example:**
```typescript
<Heading size="2xl" className="text-gray-900 font-bold">
  Welcome to ParkHive
</Heading>
```

---

### HStack (Horizontal Stack)
**Import Path:** `@/components/ui/hstack`
```typescript
import { HStack } from '@/components/ui/hstack';
```

**Available Props:**
- `space`: 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'
- `reversed`: boolean

**Usage Example:**
```typescript
<HStack space="md" className="items-center">
  <Icon />
  <Text>Label</Text>
</HStack>
```

---

### Input
**Import Path:** `@/components/ui/input`
```typescript
import { Input, InputField, InputIcon, InputSlot } from '@/components/ui/input';
```

**Available Props:**
- `size`: 'sm', 'md', 'lg', 'xl'
- `variant`: 'outline', 'underlined', 'rounded'

**Usage Example:**
```typescript
<Input size="md" variant="outline">
  <InputSlot>
    <InputIcon as={SearchIcon} />
  </InputSlot>
  <InputField placeholder="Search parking spots..." />
</Input>
```

---

### Modal
**Import Path:** `@/components/ui/modal`
```typescript
import { 
  Modal, 
  ModalBackdrop, 
  ModalContent, 
  ModalCloseButton, 
  ModalHeader, 
  ModalBody, 
  ModalFooter 
} from '@/components/ui/modal';
```

**Available Props:**
- `size`: 'xs', 'sm', 'md', 'lg', 'full'

**Usage Example:**
```typescript
<Modal isOpen={showModal} onClose={setShowModal} size="md">
  <ModalBackdrop />
  <ModalContent>
    <ModalHeader>
      <Heading>Modal Title</Heading>
      <ModalCloseButton />
    </ModalHeader>
    <ModalBody>
      <Text>Modal content</Text>
    </ModalBody>
    <ModalFooter>
      <Button onPress={handleClose}>
        <ButtonText>Close</ButtonText>
      </Button>
    </ModalFooter>
  </ModalContent>
</Modal>
```

---

### Pressable
**Import Path:** `@/components/ui/pressable`
```typescript
import { Pressable } from '@/components/ui/pressable';
```

**Usage Example:**
```typescript
<Pressable onPress={handlePress} className="p-4 rounded-lg">
  <Text>Pressable content</Text>
</Pressable>
```

---

### Text
**Import Path:** `@/components/ui/text`
```typescript
import { Text } from '@/components/ui/text';
```

**Available Props:**
- `size`: '2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl'
- Text styling: `bold`, `underline`, `strikeThrough`, `italic`, `highlight`, `isTruncated`, `sub`

**Usage Example:**
```typescript
<Text size="md" className="text-gray-600">
  Regular text content
</Text>
```

---

### Toast
**Import Path:** `@/components/ui/toast`
```typescript
import { useToast, Toast, ToastTitle, ToastDescription } from '@/components/ui/toast';
```

**Available Props:**
- `action`: 'error', 'warning', 'success', 'info', 'muted'
- `variant`: 'solid', 'outline'

**Usage Example:**
```typescript
const toast = useToast();

const showToast = () => {
  toast.show({
    placement: "top",
    render: ({ id }) => (
      <Toast action="success" variant="solid">
        <ToastTitle>Success!</ToastTitle>
        <ToastDescription>Parking spot saved successfully.</ToastDescription>
      </Toast>
    ),
  });
};
```

---

### VStack (Vertical Stack)
**Import Path:** `@/components/ui/vstack`
```typescript
import { VStack } from '@/components/ui/vstack';
```

**Available Props:**
- `space`: 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'
- `reversed`: boolean

**Usage Example:**
```typescript
<VStack space="lg" className="items-center">
  <Heading>Title</Heading>
  <Text>Description</Text>
  <Button><ButtonText>Action</ButtonText></Button>
</VStack>
```

---

## Theme Provider
**Import Path:** `@/components/ui/gluestack-ui-provider`
```typescript
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
```

**Usage:** Already configured in `app/_layout.tsx`

---

## Legacy Themed Components
**Import Path:** `@/components/Themed`
```typescript
import { Text, View } from '@/components/Themed';
```

**Note:** These are the original Expo template components with theme support. Use the GluestackUI components above for new development.

---

## Utility Components

### ExternalLink
**Import Path:** `@/components/ExternalLink`
```typescript
import { ExternalLink } from '@/components/ExternalLink';
```

**Usage Example:**
```typescript
<ExternalLink href="https://parkhive.com">
  <Text>Visit ParkHive</Text>
</ExternalLink>
```

### StyledText
**Import Path:** `@/components/StyledText`
```typescript
import { MonoText } from '@/components/StyledText';
```

**Usage Example:**
```typescript
<MonoText>Monospace text content</MonoText>
```

---

## Icon Libraries Available

### Lucide React Native
```typescript
import { MapPin, Camera, Bell, Settings, User, ChevronLeft, Star } from 'lucide-react-native';
```

### Expo Vector Icons
```typescript
import FontAwesome from '@expo/vector-icons/FontAwesome';
```

---

## Common Styling Classes (NativeWind/Tailwind)

### Colors
- **Primary**: `bg-blue-500`, `text-blue-500`, `border-blue-500`
- **Success**: `bg-green-500`, `text-green-500`, `border-green-500`
- **Warning**: `bg-yellow-500`, `text-yellow-500`, `border-yellow-500`
- **Error**: `bg-red-500`, `text-red-500`, `border-red-500`
- **Gray Scale**: `bg-gray-50` to `bg-gray-900`, `text-gray-50` to `text-gray-900`

### Layout
- **Flex**: `flex-1`, `flex-row`, `flex-col`, `items-center`, `justify-center`, `justify-between`
- **Spacing**: `p-4`, `px-5`, `py-6`, `m-4`, `mx-auto`, `gap-2` to `gap-8`
- **Sizing**: `w-full`, `h-full`, `w-10`, `h-10`, `max-w-sm`

### Typography
- **Font Weight**: `font-normal`, `font-medium`, `font-semibold`, `font-bold`
- **Font Size**: `text-xs`, `text-sm`, `text-base`, `text-lg`, `text-xl`, `text-2xl`, `text-3xl`
- **Text Alignment**: `text-left`, `text-center`, `text-right`

### Borders & Radius
- **Border Radius**: `rounded`, `rounded-md`, `rounded-lg`, `rounded-xl`, `rounded-full`
- **Border**: `border`, `border-2`, `border-gray-200`, `border-t`, `border-b`

### Shadows
- **Elevation**: `shadow-sm`, `shadow`, `shadow-lg`

---

## Navigation (Expo Router)

### Router Functions
```typescript
import { router } from 'expo-router';

// Navigate to screen
router.push('/permissions');
router.push('/(tabs)/profile');

// Go back
router.back();

// Replace current screen
router.replace('/login');
```

### Link Component
```typescript
import { Link } from 'expo-router';

<Link href="/permissions" asChild>
  <Button>
    <ButtonText>Go to Permissions</ButtonText>
  </Button>
</Link>
```

---

## Best Practices

1. **Always use GluestackUI components** for new development instead of raw React Native components
2. **Combine className prop with NativeWind** for styling instead of StyleSheet when possible
3. **Use VStack and HStack** for layout instead of manual flexbox styling
4. **Consistent spacing** using the space prop on Stack components
5. **Color consistency** using the predefined color palette
6. **Icon consistency** preferring Lucide React Native icons
7. **Type safety** with TypeScript for all component props

This reference covers all available UI components in the ParkHive project with proper import paths and usage examples.