CC = gcc
TARGET = run

all: $(TARGET)

$(TARGET): main.c mono.c test.c 
	$(CC) main.c mono.c test.c -o $(TARGET)

clean:
	$(RM) $(TARGET)

